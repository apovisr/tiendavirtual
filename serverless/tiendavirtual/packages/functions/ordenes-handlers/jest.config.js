/** @type {import('jest').Config} */
const config = {
    preset: 'ts-jest',
    moduleFileExtensions: ['js', 'ts'],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
      },
    verbose: true,
    collectCoverage: true,
    coverageDirectory: 'coverage',
    coverageReporters: ['json', 'lcov', 'text', 'clover'],
    coverageThreshold: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80,
        },
    }
};
  
module.exports = config;