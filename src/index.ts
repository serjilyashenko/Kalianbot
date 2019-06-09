import express from 'express';
import Telegraf from 'telegraf';
import { token } from './config';
import { initAdmin } from './admin';
import help from './middlewares/help/index';
import { user } from './middlewares/user/is-user';
import { stickers } from './middlewares/messages/stickers';

const keyWords = {
  go: ['погнали', 'Погнали', 'пошли', 'Пошли', 'Гоу', 'гоу', 'гоним', 'Гоним'],
  greeting: ['привет', 'Привет', 'Йо', 'Yo', 'hello', 'hey', 'hi'],
  kalik: ['кальян', 'калик'],
  smoke: ['пыхнуть', 'пыхтеть', 'пыхать', 'Пыхнуть', 'Пыхтеть', 'попыхтеть', 'Попыхтеть', 'попыхтим', 'Попыхтим'],
};

export const bot = new Telegraf(token);
bot.start((ctx) => ctx.reply('I\'m Kalik! Happy to be here!'));
bot.help(user, ...help);

initAdmin(bot);

bot.on('sticker', stickers);

bot.hears(keyWords.greeting, (ctx) => ctx.reply('Салют! Может на кальян? Кто хочешь попыхтеть?'));
bot.hears(keyWords.go, (ctx) => ctx.reply('Go Флексить. Калик всегда за движуху.'));
bot.hears(keyWords.smoke, (ctx) => ctx.reply('Забымим все, как паровоз!'));

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
  ctx.reply(`${sender}! Хочешь попыхтеть?`);
});

const expressApp = express();
const port = process.env.PORT || 3000;
expressApp.get('/', (req, res) => {
  res.send('Kalik bot lives here :)');
});
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

bot.launch();

console.log('>> Kalik - Telegram bot started!');
