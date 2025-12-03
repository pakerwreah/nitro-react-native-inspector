import type { HybridObject } from 'react-native-nitro-modules';

export interface Inspector extends HybridObject<{ ios: 'c++' }> {
  setDatabasePaths(paths: string[]): void;
  createDatabase(path: string): void;
  query(path: string, sql: string): Result | undefined;
}

export type Result = {
  headers: string[];
  data: Data[][];
};

type Data = string | number | null;
