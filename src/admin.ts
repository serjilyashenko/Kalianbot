import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { isAdminCommand } from './utils/is-admin';

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
    // ctx.reply(JSON.stringify(ctx.message, null, 2));
    if (!isAdminCommand(ctx) || !ctx.message) {
      return;
    }

    const command: string = ctx.message.text || '';
    replyOn(ctx, command);
  });

  bot.command('ping', (ctx) => {
    ctx.reply('Pong!\n' + JSON.stringify(ctx.message, null, 2));
  });
}
