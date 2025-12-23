import { RemoteConfig } from 'firebase/remote-config';
import { IAppVersionCheckOptions } from './app-version-check';
export declare const verify: (remoteConfig: RemoteConfig, options: IAppVersionCheckOptions, consolePrint: (...args: any) => void) => Promise<void>;
