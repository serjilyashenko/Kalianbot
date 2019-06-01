import { ContextMessageUpdate } from 'telegraf';
import { User } from 'telegram-typings';
import { adminId } from '../config';

export function isAdminCommand(ctx: ContextMessageUpdate): boolean  {
  const { message } = ctx;
  if (!message || !message.from) {
    return false;
  }
  const user: User = message.from;

  const isAdmin = user.id === adminId;
  const isPrivate = message.chat.type === 'private';

  return isAdmin && isPrivate;
}
