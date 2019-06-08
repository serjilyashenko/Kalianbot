import { getLocalConfig } from "./local-config";
import { getProdConfig } from "./prod-config";

export interface IAppConfig {
  env: string | undefined;
  BOT_TOKEN: string | undefined;
  ADMIN_ID: string | undefined;
  CHAT_ID: string | undefined;
 }
export interface IYmlConfig { app: IAppConfig; }
type EnvVarType = 'number' | 'string';

const env = ['prod'].find((v: string) => v === process.env.NODE_ENV) || 'local';
const configSet: IAppConfig = env === 'local' ? getLocalConfig() : getProdConfig();

const envVar = (name: keyof IAppConfig, type: EnvVarType = 'string'): string | number  => {
  const envVariable = configSet[name];
  if (!envVariable) {
    throw new Error(`>> ${name} env variable not found`);
  }
  if (type === 'number') {
    return Number(envVariable);
  }

  return envVariable as string;
};

export const token: string = envVar('BOT_TOKEN', 'string') as string;
export const chatId: number = envVar('CHAT_ID', 'number') as number;
export const adminId: number = envVar('ADMIN_ID', 'number') as number;

export default {
  adminId,
  chatId,
  env,
  token,
};
