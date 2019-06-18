import { ContextMessageUpdate } from 'telegraf';

export const getMessage = (ctx: ContextMessageUpdate): string => {
  const { message } = ctx;
  if (!message || !message.text) {
    return '';
  }
  const text: string = message.text.toLowerCase();

  return text;
};
