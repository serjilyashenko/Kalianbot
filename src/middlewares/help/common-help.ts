import { ContextMessageUpdate, Middleware } from 'telegraf';
import { isAdminCommand } from '../../utils/is-admin';
import { VOID_FUNC } from '../../const';

export const commonHelp: Middleware<ContextMessageUpdate> = (ctx: ContextMessageUpdate, next = VOID_FUNC ): void => {
  if (!isAdminCommand(ctx)) {
    ctx.reply('Привет! Я Калик. Поставить угли?');
  }
  next();
};
