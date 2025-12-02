import { NitroModules } from 'react-native-nitro-modules';
import type { ReactNativeInspector } from './ReactNativeInspector.nitro';

const ReactNativeInspectorHybridObject =
  NitroModules.createHybridObject<ReactNativeInspector>('ReactNativeInspector');

export function multiply(a: number, b: number): number {
  return ReactNativeInspectorHybridObject.multiply(a, b);
}
