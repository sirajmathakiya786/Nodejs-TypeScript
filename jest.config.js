// jest.config.js
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    roots: ['<rootDir>/src', '<rootDir>/tests'],
    transform: {
      '^.+\\.tsx?$': 'ts-jest',
    },
  };
  