import Telegraf, { ContextMessageUpdate, Middleware } from 'telegraf';
import { token } from './config';
import { initAdmin } from './admin';
import help from './middlewares/help/index';
import { user } from './middlewares/user/is-user';

const keyWords = {
  kalik: ['кальян', 'калик'],
};

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply('I\'m Kalik! Happy to be here!'));
bot.help(user, ...help);
initAdmin(bot);

bot.on('sticker', (ctx) => {
  const isCool = Math.random() * 100 > 80;
  if (!isCool) {
    return;
  }
  ctx.reply('Классный стикер! Ты молодец 👍');
});

bot.hears(['привет', 'Привет'], (ctx) => ctx.reply('Салют! Может на кальян?'));
bot.hears(['погнали', 'Погнали'], (ctx) => ctx.reply('На кальян?'));

bot.on('text', (ctx) => {
  const { message } = ctx;
  if (!message || !message.text) {
    return;
  }
  const text: string = message.text.toLowerCase();
  if (!keyWords.kalik.some((kw) => text.indexOf(kw) !== -1)) {
    return;
  }
  const sender = message.from ? message.from.first_name : 'Бро';
  ctx.reply(`Привет, ${sender}!`);
  ctx.reply('Я Калик! Хочешь попыхтеть?');
});

bot.launch();

console.log('>> Kalik - Telegram bot started!');
