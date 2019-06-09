import { ContextMessageUpdate, Middleware } from 'telegraf';
import chats from '../../utils/chats';
import { isAdminCommand } from '../../utils/is-admin';
import fridayEvent from '../../utils/friday-event';
import { VOID_FUNC } from '../../const';
import { Chat } from 'telegram-typings';

type CMU = ContextMessageUpdate;

const buildChatList = (c: Chat, i: number) => `
${i + 1}) ${c.title || c.last_name}
fridayStatus: ${fridayEvent.getStatus()}
/force${i + 1}  /friday   /stopFriday
`;

export const adminHelp: Middleware<CMU> = async (ctx: CMU, next = VOID_FUNC ): Promise<any> => {
  const chatsList = await chats.fetchAll();
  const chatsText = chatsList.map(buildChatList).join('\n');

  if (isAdminCommand(ctx)) {
    ctx.reply(`

Hello Boss!

Chats:
${chatsText}

    `);
  }
  next();
};
