import { IAppConfig } from './index';

export const getProdConfig = (): IAppConfig => {
  const { env, BOT_TOKEN, ADMIN_ID, CHAT_ID } = process.env;

  return { env, BOT_TOKEN, ADMIN_ID, CHAT_ID };
};
