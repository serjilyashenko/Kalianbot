import db from '../db/index';

const STICKER_DELAY = 10 * 60 * 1000; // 10min

export const LAUGH_EMOJI = ['😂', '🤣', '😅', '😆'];

const laughStickers = [
  'CAADAgADKAEAAhAhAhDAvwoGOaBz2wI',
  'CAADAgAEBAACxKtoC_Huwdp69WuNAg',
  'CAADAgADfAcAAhhC7gjRW877QJEN5QI',
  'CAADAgAEBgACGELuCCtfHn-BHrhsAg',
  'CAADAgAD3wADihKqDj-3CGsrVc0jAg',
  'CAADBAADMAQAAv4zDQbXjbVzX8miEQI',
  'CAADAgADlgIAAi8P8AZHnIReZfzX-gI',
  'CAADAgADawYAAnlc4gkGVjIfFK--mgI',
  'CAADAgADLQIAAkf7CQwhkPGF7rTHFAI',
  'CAADAgADhwADpkRIC6jTV0aiZHCrAg',
  'CAADAgAEAgACNnYgDkc6FRCU8Y-eAg',
  'CAADAgADOAAD-Aq8AifIpgABltW-jwI',
  'CAADAgADvQcAAhhC7gj8fYQJsqLlIgI',
  'CAADAgAD_AYAApb6EgWvBWSv_0ImzAI',
  'CAADAgADwgYAAvoLtghYZz5i3gqMNgI',
  'CAADAgADLwEAAn7yxQwCfan9oFwrvQI',
];

export const getAnySticker = (): string => {
  const index: number = Math.floor(Math.random() * laughStickers.length);
  return laughStickers[index];
};

export const setStickerDate = (date?: Date) => {
  const lastStickerDate = date ? date : Date.now();
  db.writeTo('lastStickerDate', lastStickerDate);
};

export const isStickerReady = async () => {
  const lastSticker = await db.readFrom('lastStickerDate');
  const now = Date.now();
  if (!lastSticker) {
    return true;
  }
  return !!((now - lastSticker) >= STICKER_DELAY);
};
