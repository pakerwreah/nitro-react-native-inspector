import { NitroModules } from 'react-native-nitro-modules';
import type { Inspector, Result } from './ReactNativeInspector.nitro';
export type { Result };

export default NitroModules.createHybridObject<Inspector>('Inspector');
