import type {Config} from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';

import tsConfig from './tsconfig.json';
import tsConfigTest from './tsconfig-test.json';

const config: Config = {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!@polkadot|@babel)"
  ],
  testRunner: "jest-jasmine2",
  modulePaths: [tsConfigTest.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths, { useESM: true }),
  extensionsToTreatAsEsm: [".ts"],
  transform: {
    "\\.tsx?$": [
      'ts-jest',
      {
        useESM: true,
        tsconfig: {
          rootDir: "."
        }
      }
    ]
  },
  roots: ["test"]
}

export default config;
