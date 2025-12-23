import { App } from 'vue';
import { RemoteConfig } from 'firebase/remote-config';
import { AlertOptions } from '@ionic/vue';
export interface IAppVersionCheckModule {
    verify: (remoteConfig: RemoteConfig) => Promise<void>;
}
export interface IAppVersionCheckOptions {
    /** Enables the debug console logs */
    debug: boolean;
    /** The remote config app version key. The default value is `app_versions`. */
    appVersionsKey: string;
    /** The object passed to the Vue Ionic `alertController`. */
    updateAvailableAlertOptions: (appVersion: string, availableVersion: string) => Promise<AlertOptions>;
    /** The mandatory update page router path. The default value is `/mandatory-update` */
    mandatoryUpdateAction: (appVersion: string, mandatoryVersion: string) => Promise<void>;
}
declare const _default: {
    install: (app: App, options: IAppVersionCheckOptions) => void;
};
export default _default;
declare module 'vue' {
    interface ComponentCustomProperties {
        $avc: IAppVersionCheckModule;
    }
}
