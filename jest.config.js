/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: [
    'src'
  ],
  moduleNameMapper: {
    "^@polkadot/networks/(.*).cjs$": "@polkadot/networks/$1.cjs",
    "^@polkadot/networks/(.*)": "@polkadot/networks/$1.cjs",
    "^@polkadot/networks$": "@polkadot/networks/index.cjs",
    "^@polkadot/x-bigint/(.*)": "@polkadot/x-bigint/$1.cjs",
  },
  transformIgnorePatterns: [
    "/node_modules/(?!@polkadot|@babel)"
  ]
};
