import { ContextMessageUpdate, Middleware } from 'telegraf';
import { adminHelp } from './admin-help';
import { commonHelp } from './common-help';

const helpMiddlewares: Array<Middleware<ContextMessageUpdate>> = [
  commonHelp,
  adminHelp,
];

export default helpMiddlewares;
