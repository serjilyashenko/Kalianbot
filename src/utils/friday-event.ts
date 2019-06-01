type Timer = ReturnType<typeof setTimeout> | null;

class FridaySchedule {
  private isActive: boolean = false;
  private timer: Timer = null;
  private cb: () => void = () => null;

  public getStatus() {
    return this.isActive || !!this.timer ? 'on' : 'off';
  }

  public start(cb: () => void) {
    this.isActive = true;
    this.cb = cb;
    this.clearTimer();
    this.schedule();
  }

  public stop() {
    this.isActive = false;
    this.clearTimer();
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
