import db from '../db/index';

const DEFAULT_DELAY = 10 * 60 * 1000; // 10min

interface ITimer {
  id: string;
  delay: number;
  lastEvent: number;
}

export class Throttle {
  private async getAllTimers(): Promise<{[id: string]: ITimer}> {
    return await db.readFrom('timers') || {};
  }

  private async getTimer(id: string): Promise<ITimer | null> {
    const timers: {[id: string]: ITimer} = await this.getAllTimers() || {};
    return timers[id] || null;
  }

  public async isReadyFor(id: string): Promise<boolean> {
    const timer: ITimer | null = await this.getTimer(id);
    if (!timer) {
      return true;
    }
    const now = Date.now();
    return !!((now - timer.lastEvent) >= timer.delay);
  }

  public async try(id: string, cb: () => {}, delay: number | null) {
    if (!delay) {
      cb();
      return;
    }
    const isReady = await this.isReadyFor(id);
    if (!isReady) {
      return;
    }
    cb();
    const timers = await this.getAllTimers();
    const lastEvent = Date.now();
    const timer: ITimer = { id, delay, lastEvent };
    db.writeTo('timers', {...timers, [id]: timer});
  }
}

export default new Throttle();
