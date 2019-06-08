import db from '../db/index';
import { bot } from '..';
import { chatId } from '../config';

type Timer = ReturnType<typeof setTimeout> | null;

class FridaySchedule {
  private isActive: boolean = false;
  private timer: Timer = null;
  private cb: () => void = () => bot.telegram.sendMessage(chatId, 'Пятничка! Пора бы и на калик!');;

  constructor() {
    this.init();
  }

  private async init() {
    const isFriday = await db.readFrom('fridayMode');
    isFriday ? this.start() : this.stop();
  }

  public getStatus() {
    return this.isActive || !!this.timer ? 'on' : 'off';
  }

  public async start() {
    this.isActive = true;
    this.clearTimer();
    this.schedule();
    await db.writeTo('fridayMode', true);
  }

  public async stop() {
    this.isActive = false;
    this.clearTimer();
    await db.writeTo('fridayMode', false);
  }

  private clearTimer() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = null;
  }

  private schedule() {
    const hour: number = 1000 * 60 * 60;
    this.clearTimer();
    if (this.isActive) {
      this.timer = setTimeout(this.schedule.bind(this), hour);
      if (new Date().getHours() === 18) {
        this.cb();
      }
    } else {
      this.stop();
    }
  }
}

export default new FridaySchedule();
