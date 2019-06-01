import { ContextMessageUpdate, Middleware } from 'telegraf';
import { User } from 'telegram-typings';
import { VOID_FUNC } from '../../const';

export const user: Middleware<ContextMessageUpdate> = (ctx: ContextMessageUpdate, next = VOID_FUNC ): void => {
  const { message } = ctx;
  if (!message || !message.from) {
    return;
  }
  // const user: User = message.from;
  next();
};
