/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    'test'
  ],
  transformIgnorePatterns: [
    "/node_modules/(?!@polkadot|@babel)"
  ],
  testRunner: "jest-jasmine2"
};
