/* eslint-disable */
export default {
  displayName: 'validator-roots',
  preset: '../../../jest.preset.js',
  setupFilesAfterEnv: ['./jest.setup.ts'],
  globals: {},
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../../coverage/libs/server/validator-roots',
};
