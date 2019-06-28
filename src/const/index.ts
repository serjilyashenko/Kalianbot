import { getAny } from "../utils/get-any";

// tslint:disable-next-line
export const VOID_FUNC = (): void => { };

export type StringFunc = (arg: string) => string;
export interface ITextCategory {
  delay: number | null;
  id: string;
  keys: string[];
  responses: Array<string | StringFunc>;
}

const MINUTE = 60 * 1000;
const smoke = ['пыхнуть', 'пыхтеть', 'пыхать', 'Пыхнуть', 'Пыхтеть', 'попыхтеть', 'Попыхтеть', 'покурить', 'покальянить', 'попускать дым'];

export const TEXTs: ITextCategory[] = [
  {
    delay: 10 * MINUTE,
    id: 'go',
    keys: ['погнали', 'пошли', 'гоу', 'гоним'],
    responses: [
      'Go Флексить. Я всегда за движуху.',
      (user: string) => `${user}, клевая идея! А кальян будет?`,
      'Чур я паровоз!',
      'А меня возьмете?',
      'Я с вами!',
      'Кто за мной заедет?',
      'Блин! Черт! У меня не получится.',
      'Выезжаю',
      'Я двигаю с вами.',
      'Я если только с вейпом',
      'Я уже был.',
      'Два калика потянете? Я с подругой.',
      'Ставлю угли и выезжаю',
    ],
  },
  {
    delay: 10 * MINUTE,
    id: 'greeting',
    keys: ['привет', 'йо', 'yo', 'hello', 'hey', 'хеллоу', 'здаров', 'здоров'],
    responses: [
      'Салют! Может на кальян? Кто хочет попыхтеть?',
      'Привет! Хочешь на кальян позвать',
      'И тебе привет!',
      'Привет',
      'Hi',
      'Физкульт-Привет!',
    ],
  },
  {
    delay: null,
    id: 'smoke',
    keys: ['пых', 'курить', 'кальянить', 'дым', 'курим', 'заказали кал', 'закажите кал'],
    responses: [
      'Задымим всё, как паровоз!',
      'Накуримсяяяя!',
      'Пых-пых-пых',
      'Надымим там',
      'Попускаем дымок',
      'Чух-Чух-Чух',
      'Я умею пускать кольца',
    ],
  },
  {
    delay: null,
    id: 'kalik',
    keys: ['кальян', 'калик', 'хука', 'hookah', 'кальях'],
    responses: [
      (sender: string) => `${sender}! И ты тоже хочешь ${getAny(smoke)}?`,
    ],
  },
  {
    delay: 10 * MINUTE,
    id: 'wrong_kalik',
    keys: ['каклик', 'кальяк', 'кальях', 'калих', 'калья', 'каль'],
    responses: [
      'Пишите правильно! Я Кальянчик',
    ],
  }
];
