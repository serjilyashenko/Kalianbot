import db from '../db/index';
import { Chat } from 'telegram-typings';

export class Chats {
  public async fetchAll() {
    const payload = await db.readFrom('chats') || [];
    return payload.map((chat: Chat) => {
      if (!chat || !chat.id || !chat.type) {
        return null;
      }
      return chat;
    }).filter((it: Chat | null) => !!it);
  }

  public async addChat(chat: Chat) {
    const chats = await this.fetchAll();
    const filteredChats = chats.filter((c: Chat) => c.id !== chat.id);
    db.writeTo('chats', [...filteredChats, chat]);
  }

  public async removeChat(id: number) {
    const chats = await this.fetchAll();
    db.writeTo('chats', chats.filter((c: Chat) => c.id !== id));
  }
}

export default new Chats();
