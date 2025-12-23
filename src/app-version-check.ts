import { App } from 'vue';
import { RemoteConfig } from 'firebase/remote-config';
import { verify } from './verify';
import { AlertOptions } from '@ionic/vue';

export interface IAppVersionCheckModule {
  verify: (remoteConfig: RemoteConfig) => Promise<void>;
}

export interface IAppVersionCheckOptions {
  /** Enables the debug console logs */
  debug: boolean,
  /** The remote config app version key. The default value is `app_versions`. */
  appVersionsKey: string,

  /** The object passed to the Vue Ionic `alertController`. */
  updateAvailableAlertOptions: (appVersion: string, availableVersion: string) => Promise<AlertOptions>,

  /** The mandatory update page router path. The default value is `/mandatory-update` */
  mandatoryUpdateAction: (appVersion: string, mandatoryVersion: string) => Promise<void>,
}

export default {
  install: (
    app: App,
    options: IAppVersionCheckOptions
  ) => {
    // Set the default values
    let safeOptions: IAppVersionCheckOptions = {
      debug: false,
      appVersionsKey: 'app_versions',
      updateAvailableAlertOptions: async () => ({
        header: 'Update available',
        message: 'There\'s a new app update available. Update the app to enjoy all the latest functionalities.',
        buttons: ['Ok'],
      }),
      mandatoryUpdateAction: async () => { },
    }
    if (options != undefined) {
      safeOptions = {
        ...safeOptions,
        ...options
      }
    }

    const consolePrint = (...args: any) => {
      if (options.debug === true) {
        console.debug(...args)
      } 
    }

    consolePrint('AppVersionCheckModule - install', { options: safeOptions })

    // inject a globally available $avc method
    app.config.globalProperties.$avc = {
      verify: async (remoteConfig: RemoteConfig) => verify(remoteConfig, safeOptions, consolePrint)
    }

    consolePrint('AppVersionCheckModule - installed')
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $avc: IAppVersionCheckModule;
  }
}
