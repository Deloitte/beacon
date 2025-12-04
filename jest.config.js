module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['jest-localstorage-mock'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '^.+\\.ts?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  setupFiles: [],
  reporters: ['default', 'jest-junit'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/beacon/lib/jest.{js,jsx,ts,tsx}',
  ],
  coverageReporters: ['json-summary', 'text', 'lcov', 'html'],
  coverageDirectory: './coverage',
};
