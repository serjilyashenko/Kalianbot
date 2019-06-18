import express from 'express';
import Telegraf from 'telegraf';
import chats from './utils/chats';
import { token } from './config';
import { initAdmin } from './admin';
import help from './middlewares/help/index';
import { user } from './middlewares/user/is-user';
import { stickers } from './middlewares/messages/stickers';
import { text } from './middlewares/messages/text';

export const bot = new Telegraf(token);
bot.start((ctx) => {
  ctx.reply('I\'m Kalik! Happy to be here!');
  const { message } = ctx;
  if (!message || !message.chat) {
    return;
  }
  chats.addChat(message.chat);
});

bot.help(user, ...help);

initAdmin(bot);

bot.on('sticker', stickers);

bot.on('text', text);

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
