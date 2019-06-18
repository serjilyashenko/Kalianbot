import throttle from '../../utils/throttle';
import { getAny } from '../../utils/get-any';
import { ContextMessageUpdate, Middleware } from 'telegraf';
import { VOID_FUNC, TEXTs, ITextCategory, StringFunc } from '../../const';
import { getMessage } from '../../utils/get-message';
import { getSender } from '../../utils/get-sender';

export const text: Middleware<ContextMessageUpdate> = async (ctx: ContextMessageUpdate, next = VOID_FUNC) => {
  const message = getMessage(ctx);
  const textCategory: ITextCategory | null = TEXTs.find((cat: ITextCategory) => {
    return cat.keys.some((key: string) => message.indexOf(key) !== -1);
  }) || null;

  if (!textCategory) {
    next();
    return;
  }

  const anyResponse: string | StringFunc = getAny(textCategory.responses);
  const sender: string = getSender(ctx);
  const resMessage: string = typeof anyResponse === 'function' ? anyResponse(sender) : anyResponse;

  throttle.try(textCategory.id, () => ctx.reply(resMessage), textCategory.delay);
  next();
};
