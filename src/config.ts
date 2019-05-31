// tslint:disable-next-line
require('dotenv').config();

const envToken: string | null = process.env.BOT_TOKEN || null;

if (!envToken) {
  throw new Error('>> Create `.env` file with your own Telegram bot token');
}

export const token: string = envToken;

export default {
  token,
};
