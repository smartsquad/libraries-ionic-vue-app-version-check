import { verify } from './verify';
export default {
    install: (app, options) => {
        // Set the default values
        let safeOptions = {
            debug: false,
            appVersionsKey: 'app_versions',
            updateAvailableAlertOptions: async () => ({
                header: 'Update available',
                message: 'There\'s a new app update available. Update the app to enjoy all the latest functionalities.',
                buttons: ['Ok'],
            }),
            mandatoryUpdateAction: async () => { },
        };
        if (options != undefined) {
            safeOptions = {
                ...safeOptions,
                ...options
            };
        }
        const consolePrint = (...args) => {
            if (options.debug === true) {
                console.debug(...args);
            }
        };
        consolePrint('AppVersionCheckModule - install', { options: safeOptions });
        // inject a globally available $translate() method
        app.config.globalProperties.$avc = {
            verify: async (firebase) => verify(firebase, safeOptions, consolePrint)
        };
        consolePrint('AppVersionCheckModule - installed');
    }
};
//# sourceMappingURL=app-version-check.js.map