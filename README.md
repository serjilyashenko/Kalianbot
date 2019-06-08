# Kalianbot
Telegram bot for hookah chats. You can find it `@K1yan0bot` in Telegram search.

## Table of Contents

- [Installation](#instalation)
- [Development](#dev)
- [Production](#prod)

## Installation

**Note:** Make sure git, NodeJs and NPM are installed

- Clone the current repository:

```bush
git clone https://github.com/serjilyashenko/Kalianbot
```

- For installation of npm dependencies execute from project folder:

```bush
yarn install
```

or

```bush
npm install
```

- Get your own Telegram bot token using [BotFather](https://telegram.me/botfather). Getting process described in [Bots: Introduction for developers](https://core.telegram.org/bots#6-botfather)

## Development

- Create `config.yml` file with the next content:
```
app:
  env: local
  BOT_TOKEN: <your own Telegram bot token>
  ADMIN_ID: <your Telegram Id>
  CHAT_ID: <target hookah chat>
```

**Note**: ADMIN_ID and CHAT_ID should be got from your oun Telegram using `/ping` command. It will be developed more friendly in future versions of the bot.

- Start bot using next command:

```bush
yarn dev
```

or

```bush
npm run dev
```

## Production

Create next environment variables like this:

```bush
  env: prod
  BOT_TOKEN: <your own Telegram bot token>
  ADMIN_ID: <your Telegram Id>
  CHAT_ID: <target hookah chat>
```

The bot should be started by `npm start` command.
