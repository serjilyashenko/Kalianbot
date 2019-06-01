import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { isAdmin, isAdminCommand } from './utils/is-admin';
import fridayEvent from './utils/friday-event';

const targetChatId: number = -396393497;

function replyOn(ctx: ContextMessageUpdate, command: string): void {
  const text: string = command.split(' ').slice(1).join(' ');

  if (!text) {
    ctx.reply('There is no message Boss');
    return;
  }

  ctx.telegram.sendMessage(targetChatId, text);
  ctx.reply('It was sent Boss!');
}

export function initAdmin(bot: Telegraf<ContextMessageUpdate>) {

  bot.command('force', (ctx) => {
    if (!isAdminCommand(ctx) || !ctx.message) {
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

  bot.command('friday', (ctx) => {
    if (!isAdminCommand(ctx) || !ctx.message) {
      return;
    }
    fridayEvent.start(() => {
      ctx.telegram.sendMessage(targetChatId, 'Пятничка! Пора бы и на калик!');
    });
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });

  bot.command('stopFriday', (ctx) => {
    if (!isAdminCommand(ctx) || !ctx.message) {
      return;
    }
    fridayEvent.stop();
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });
}
