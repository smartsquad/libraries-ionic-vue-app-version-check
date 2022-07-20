import Firebase from 'firebase';
import { App } from '@capacitor/app';
import { IAppVersionCheckOptions } from './app-version-check';
export declare const verify: (firebase: Firebase.app.App, options: IAppVersionCheckOptions, consolePrint: (...args: any) => void) => Promise<void>;
