const { pathsToModuleNameMapper } = require('ts-jest');
const tsConfig = require('./tsconfig.json');
const tsConfigTest = require('./tsconfig-test.json');

module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  transformIgnorePatterns: [
    "node_modules/(?!@polkadot|@babel)"
  ],
  testRunner: "jest-jasmine2",
  roots: ["test"],
  modulePaths: [tsConfigTest.compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(tsConfig.compilerOptions.paths),
}
