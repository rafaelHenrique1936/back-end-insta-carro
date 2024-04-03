
module.exports = {
  preset: 'ts-jest',
  testMatch: ["**/*.spec.ts"],
  testEnvironment: 'node',
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
};