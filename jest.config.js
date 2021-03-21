const { pathsToModuleNameMapper } = require('ts-jest/utils');
const { compilerOptions } = require('./tsconfig.json');

module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    '<rootDir>/src/modules/**/services/*.ts',
    '<rootDir>/src/modules/**/infra/http/routes/*.ts',
    '<rootDir>/src/shared/infra/routes/*.ts'
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  coverageDirectory: 'coverage',
  coverageReporters: [
    "text-summary",
    'lcov',
  ],
  moduleNameMapper: pathsToModuleNameMapper(
    compilerOptions.paths,
    {
      prefix: '<rootDir>/src/'
    }
  ),
  preset: 'ts-jest',
  testEnvironment: "node",
  testMatch: [
    "<rootDir>/tests/**/*.spec.ts"
  ],
  testPathIgnorePatterns: [
    "/node_modules/",
    "/dist/"
  ],
  testResultsProcessor: "jest-sonar-reporter",
  setupFilesAfterEnv: ['./jest.setup.js'],
};