import { ContextMessageUpdate } from 'telegraf';
import { User } from 'telegram-typings';
import { adminId } from '../config';

export function isAdmin(ctx: ContextMessageUpdate): boolean {
  const { message } = ctx;
  if (!message || !message.from) {
    return false;
  }
  const user: User = message.from;

  return user.id === adminId;
}

export function isAdminCommand(ctx: ContextMessageUpdate): boolean  {
  if (!isAdmin(ctx) || !ctx.message) {
    return false;
  }
  return ctx.message.chat.type === 'private';
}
