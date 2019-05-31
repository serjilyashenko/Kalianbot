import Telegraf from 'telegraf';
import { token } from './config';
import name from './name';

console.log('!! ', token);

// const bot = new Telegraf(process.env.BOT_TOKEN)
// bot.start((ctx: TContext) => ctx.reply('Welcome'))
// bot.help((ctx) => ctx.reply('Send me a sticker'))
// bot.on('sticker', (ctx) => ctx.reply('👍'))
// bot.hears('hi', (ctx) => ctx.reply('Hey there'))
// bot.launch()

console.log(`>> ${name} - Telegram bot started!`);
