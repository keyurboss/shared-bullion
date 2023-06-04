const nxPreset = require('@nx/jest/preset').default;

module.exports = {
  ...nxPreset,
  setupFilesAfterEnv: ['./jest.setup.ts'],
  maxWorkers: 3,
  testMatch: ['**/+(*.)+(integration-)(spec|test).+(ts|js)?(x)'],
};
