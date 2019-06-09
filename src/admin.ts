import Telegraf, { ContextMessageUpdate } from 'telegraf';
import { isAdmin } from './utils/is-admin';
import fridayEvent from './utils/friday-event';
import { admin } from './middlewares/user/admin-command';
import chats from './utils/chats';

async function replyOn(ctx: ContextMessageUpdate, command: string): Promise<any> {
  const chatList = await chats.fetchAll() || [];
  const commandParts: string[] = command.split(' ');
  const [, chatIndex, ...messageParts] = commandParts;
  const message = messageParts.join(' ');

  if (!chatIndex || !message) {
    ctx.reply('Incorrect command Boss');
    return;
  }

  // TODO: Some refactoring is necessary here. Access should be by Id or something else instead of Array index
  const chatId = chatList[Number(chatIndex) - 1].id;

  ctx.telegram.sendMessage(chatId, message);
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

  bot.command('friday', admin, async (ctx) => {
    await fridayEvent.start();
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });

  bot.command('stopFriday', admin, async (ctx) => {
    await fridayEvent.stop();
    ctx.reply(`Status: ${fridayEvent.getStatus()}`);
  });
}
