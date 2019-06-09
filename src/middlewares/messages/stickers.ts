import { ContextMessageUpdate, Middleware } from 'telegraf';
import { VOID_FUNC } from '../../const';
import { getAnySticker, LAUGH_EMOJI, isStickerReady, setStickerDate } from '../../utils/stickers';

export const stickers: Middleware<ContextMessageUpdate> = async (ctx: ContextMessageUpdate, next = VOID_FUNC) => {
  if (!ctx.message || !ctx.message.sticker) {
    next();
    return;
  }

  const chatId: number = ctx.chat ? ctx.chat.id : 0;
  const emoji = ctx.message.sticker.emoji || '';

  const isReady = await isStickerReady();

  if (LAUGH_EMOJI.includes(emoji) && isReady) {
    setTimeout(async () => {
      ctx.telegram.sendSticker(chatId, getAnySticker());
      setStickerDate();
    }, 1000);
    next();
    return;
  }

  const isCool = Math.random() * 100 > 90;
  if (!isCool) {
    next();
    return;
  }

  ctx.reply('Классный стикер! Ты молодец 👍');
  next();
};
