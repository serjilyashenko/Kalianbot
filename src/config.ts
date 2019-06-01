// tslint:disable-next-line
require('dotenv').config();

const { BOT_TOKEN = null, ADMIN_ID = '' } = process.env;

const envToken: string | null = BOT_TOKEN;

if (!envToken) {
  throw new Error('>> Create `.env` file with your own Telegram bot token');
}

export const token: string = envToken;
export const adminId: number = ADMIN_ID ? Number(ADMIN_ID) : -1;

export default {
  adminId,
  token,
};
