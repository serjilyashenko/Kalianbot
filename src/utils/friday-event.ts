import db from '../db/index';
import { bot } from '..';
import { chatId } from '../config';

const fridayMessages = [
  'Сегодня пятничка) Я ни на что не намекаю 😉',
  'Пятничка! Погнали вечером на калик?',
  'Пятничка! Может, на калик?',
  'Напоминаю, что сегодня пятница.',
  'Пойдем на калик?',
  'Напоминаю про пятничный калик!',
  'Никто не забыл, что сегодня пятница?',
  'Калик уже стынет',
  'Пойдем на калик? Надо бы забронить заранее, сегодня ж пятница.',
  'На калик вечером?',
  'Никто не хочет вечером на калик?',
];

type Timer = ReturnType<typeof setTimeout> | null;

class FridaySchedule {
  private isActive: boolean = false;
  private timer: Timer = null;
  private cb: () => void = () => bot.telegram.sendMessage(chatId, this.getAnyMessage());;

  constructor() {
    this.init();
  }

  private async init() {
    const isFriday = await db.readFrom('fridayMode');
    isFriday ? this.start() : this.stop();
  }

  private getAnyMessage() {
    const index: number = Math.floor(Math.random() * fridayMessages.length);
    return fridayMessages[index];
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
      const now = new Date();
      if (now.getHours() === 13 && now.getDay() === 5) {
        this.cb();
      }
    } else {
      this.stop();
    }
  }
}

export default new FridaySchedule();
