module.exports = {
    moduleNameMapper: {
      '^@root/(.*)$': '<rootDir>/src/$1',
      '^@config/(.*)$': '<rootDir>/src/config/$1',
      '^@controllers/(.*)$': '<rootDir>/src/controllers/$1',
      '^@models/(.*)$': '<rootDir>/src/models/$1',
      '^@routes/(.*)$': '<rootDir>/src/routes/$1',
    },
    testEnvironment: 'node',
  };
  