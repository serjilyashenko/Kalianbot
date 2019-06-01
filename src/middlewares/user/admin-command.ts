import { ContextMessageUpdate, Middleware } from 'telegraf';
import { VOID_FUNC } from '../../const';
import { isAdminCommand } from '../../utils/is-admin';

export const admin: Middleware<ContextMessageUpdate> = (ctx: ContextMessageUpdate, next = VOID_FUNC ): void => {
  if (!isAdminCommand(ctx) || !ctx.message) {
    return;
  }
  next();
};
