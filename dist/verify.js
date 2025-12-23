import { fetchAndActivate, getValue } from 'firebase/remote-config';
import { App } from '@capacitor/app';
import semver from 'semver';
import { alertController } from '@ionic/vue';
export const verify = async (remoteConfig, options, consolePrint) => {
    consolePrint('AppVersionCheckModule - initialize');
    if (remoteConfig == undefined) {
        console.error('AppVersionCheckModule - remoteConfig is undefined');
        return;
    }
    await fetchAndActivate(remoteConfig);
    consolePrint('AppVersionCheckModule - remoteConfigs - configurations fetched');
    const appVersions = getValue(remoteConfig, options.appVersionsKey).asString();
    consolePrint('AppVersionCheckModule - remoteConfigs - app version', { appVersionsKey: options.appVersionsKey, appVersions });
    if (appVersions === '' || typeof appVersions !== 'string') {
        consolePrint('AppVersionCheckModule - remoteConfigs - app versions value is not valid');
        return;
    }
    let appVersionsObject = {};
    try {
        appVersionsObject = JSON.parse(appVersions);
    }
    catch (error) {
        console.error('AppVersionCheckModule - remoteConfigs - error parsing the JSON data');
        console.error(error);
        return;
    }
    consolePrint('AppVersionCheckModule - remoteConfigs - app version - parsed', { appVersionsObject });
    if (appVersionsObject.c == undefined || typeof appVersionsObject.c !== 'string'
        || appVersionsObject.m == undefined || typeof appVersionsObject.m !== 'string'
        || !semver.valid(appVersionsObject.c)
        || !semver.valid(appVersionsObject.m)) {
        consolePrint('AppVersionCheckModule - remoteConfigs - app versions JSON data values are not valid');
        return;
    }
    let currentAppVersion = '';
    try {
        const { version } = await App.getInfo();
        currentAppVersion = version;
    }
    catch (error) {
        console.error('AppVersionCheckModule - Capacitor - error retrieving the app information using the `@capacitor/app` plugin');
        console.error(error);
        return;
    }
    consolePrint('AppVersionCheckModule - current app version', { currentAppVersion });
    if (!semver.valid(currentAppVersion)) {
        console.error('AppVersionCheckModule - the current app version is not a valid \'semver\' version');
        return;
    }
    if (!semver.gte(currentAppVersion, appVersionsObject.m)) {
        consolePrint(`AppVersionCheckModule - the vurrent app verion ${currentAppVersion} is lower than the minimum required ${appVersionsObject.m}`);
        await options.mandatoryUpdateAction(currentAppVersion, appVersionsObject.m);
        return;
    }
    if (!semver.gte(currentAppVersion, appVersionsObject.c)) {
        consolePrint(`AppVersionCheckModule - the vurrent app verion ${currentAppVersion} is lower than the current ${appVersionsObject.m} available`);
        const alert = await alertController.create(await options.updateAvailableAlertOptions(currentAppVersion, appVersionsObject.c));
        await alert.present();
        return;
    }
};
//# sourceMappingURL=verify.js.map