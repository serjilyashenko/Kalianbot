import { ContextMessageUpdate } from 'telegraf';

export const getSender = (ctx: ContextMessageUpdate): string => {
  const { message } = ctx;
  if (!message || !message.from) {
    return 'BRU';
  }

  if (Math.random() * 100 > 70) {
    return 'BRU';
  }

  return  message.from.first_name ? message.from.first_name : 'BRU';
};
