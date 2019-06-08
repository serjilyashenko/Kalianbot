import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { isAdmin } from './utils/is-admin';
import fridayEvent from './utils/friday-event';
import { admin } from './middlewares/user/admin-command';
import { chatId } from './config';

function replyOn(ctx: ContextMessageUpdate, command: string): void {
  const text: string = command.split(' ').slice(1).join(' ');

  if (!text) {
    ctx.reply('There is no message Boss');
    return;
  }

  ctx.telegram.sendMessage(chatId, text);
  ctx.reply('It was sent Boss!');
}

export function initAdmin(bot: Telegraf<ContextMessageUpdate>) {

  bot.command('force', admin, (ctx) => {
    if (!ctx.message) {
      return;
    }
    const command: string = ctx.message.text || '';
    replyOn(ctx, command);
  });

  bot.command('ping', (ctx) => {
    if (!isAdmin(ctx)) {
      return;
    }
    ctx.reply('Pong!\n' + JSON.stringify(ctx.message, null, 2));
  });

  bot.command('friday', admin, (ctx) => {
    fridayEvent.start(() => {
      ctx.telegram.sendMessage(chatId, 'Пятничка! Пора бы и на калик!');
    });
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });

  bot.command('stopFriday', admin, (ctx) => {
    fridayEvent.stop();
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });
}
