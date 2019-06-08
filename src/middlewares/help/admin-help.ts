import { ContextMessageUpdate, Middleware } from 'telegraf';
import { isAdminCommand } from '../../utils/is-admin';
import fridayEvent from '../../utils/friday-event';
import { VOID_FUNC } from '../../const';

export const adminHelp: Middleware<ContextMessageUpdate> = (ctx: ContextMessageUpdate, next = VOID_FUNC ): void => {
  if (isAdminCommand(ctx)) {
    ctx.reply(`
    Hello Boss!
    I'm alive!

    /force - I'll forward your message

    Status: ${fridayEvent.getStatus()}

    /friday - I'll schedule friday reminder
    /stopFriday - I'll stop friday reminder
    `);
  }
  next();
};
