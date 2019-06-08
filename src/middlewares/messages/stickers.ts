import { ContextMessageUpdate, Middleware } from 'telegraf';
import { VOID_FUNC } from '../../const';

export const stickers: Middleware<ContextMessageUpdate> = (ctx: ContextMessageUpdate, next = VOID_FUNC ) => {
  if (ctx.message && ctx.message.sticker) {
    const chatId: number =  ctx.chat ? ctx.chat.id : 0;
    const emoji = ctx.message.sticker.emoji;
    if (emoji === '😂') {
      setTimeout(async () => {
        ctx.telegram.sendSticker(chatId, 'CAADAgADKAEAAhAhAhDAvwoGOaBz2wI');
      }, 1000);
      return;
    }
  }

  const isCool = Math.random() * 100 > 80;
  if (!isCool) {
    return;
  }
  ctx.reply('Классный стикер! Ты молодец 👍');

  next();
};
