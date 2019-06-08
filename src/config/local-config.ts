import { IAppConfig, IYmlConfig } from './index';

export const getLocalConfig = (): IAppConfig => {
  let ymlConfig: IYmlConfig;

  try {
    ymlConfig = require('config-yml').load('config');
  } catch (e) {
    throw new Error('>> config.yml file not found;');
  }

  if (!ymlConfig.app) {
    throw new Error(`>> app.${name} not found in the config.yml`);
  }

  return ymlConfig.app;
};
