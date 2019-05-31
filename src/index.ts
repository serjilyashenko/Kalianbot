import Telegraf, { Markup } from 'telegraf';
import { token } from './config';
import name from './name';

const keyWords = {
  kalik: ['кальян', 'калик'],
};

const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply('Welcome'));
bot.help((ctx) => ctx.reply('Send me a sticker'));
bot.on('sticker', (ctx) => {
  const isCool = Math.random() * 100 > 80;
  if (!isCool) {
    return;
  }
  ctx.reply('Классный стикер! Ты молодец 👍');
});
bot.hears(['hi', 'hi1'], (ctx) => ctx.reply('Hey there'));
bot.on('text', (ctx) => {
  const { message } = ctx;
  if (!message || !message.text) {
    return;
  }
  const text: string = message.text.toLowerCase();
  if (!keyWords.kalik.some(kw => text.indexOf(kw) !== -1)) {
    return;
  }
  const sender = message.from ? message.from.first_name : 'Бро';
  ctx.reply(`Привет, ${sender}!`);
  ctx.reply('Я Калик! Хочешь попыхтеть?');
});
bot.launch();

console.log(`>> ${name} - Telegram bot started!`);
