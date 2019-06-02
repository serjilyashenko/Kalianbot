import express from 'express';
import Telegraf from 'telegraf';
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
  if (ctx.message && ctx.message.sticker) {
    const chatId: number =  ctx.chat ? ctx.chat.id : 0;
    const emoji = ctx.message.sticker.emoji;
    if (emoji === '😂') {
      setTimeout(async () => {
        ctx.telegram.sendSticker(chatId, 'CAADAgADKAEAAhAhAhDAvwoGOaBz2wI');
      }, 1000);
      return;
    }
  }

  const isCool = Math.random() * 100 > 80;
  if (!isCool) {
    return;
  }
  ctx.reply('Классный стикер! Ты молодец 👍');
});

bot.hears(['привет', 'Привет'], (ctx) => ctx.reply('Салют! Может на кальян?'));
bot.hears(['погнали', 'Погнали'], (ctx) => ctx.reply('А кальян будет?'));
bot.hears(['пыхнуть', 'пыхтеть', 'пыхать', 'Пыхнуть', 'Пыхтеть'], (ctx) => ctx.reply('Надымим, как паровоз!'));

bot.on('text', (ctx) => {
  const { message } = ctx;
  const isMode1 = Math.random() * 100 > 80;
  if (!message || !message.text) {
    return;
  }
  const text: string = message.text.toLowerCase();
  if (!keyWords.kalik.some((kw) => text.indexOf(kw) !== -1)) {
    return;
  }
  const sender = message.from ? message.from.first_name : 'Бро';
  if (isMode1) {
    ctx.reply(`Привет, ${sender}! \nЯ Калик! Хочешь попыхтеть?`);
  } else {
    ctx.reply('Бабуляяя! Извини меня! Я снова разбил твою любимую вазу. Ну за@бись... Третий кальян за неделю!');
  }
});

const expressApp = express();
const port = process.env.PORT || 3000
expressApp.get('/', (req, res) => {
  res.send('Kalik bot lives here :)');
});
expressApp.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

bot.launch();

console.log('>> Kalik - Telegram bot started!');
