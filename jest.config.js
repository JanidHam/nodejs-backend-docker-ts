module.exports = {
  "roots": [
    "<rootDir>/test"
  ],
  preset: 'ts-jest',
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  },
  "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  "moduleFileExtensions": [
    "ts",
    "tsx",
    "js",
    "jsx",
    "json",
    "node",
  ],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@root/(.*)$': '<rootDir>/src/$1',
    '^@api/(.*)$': '<rootDir>/src/api/$1',
    '^@db/(.*)$': '<rootDir>/src/db/$1',
    '^@auth/(.*)$': '<rootDir>/src/auth/$1',
    '^@utils/(.*)$': '<rootDir>/src/utils/$1',
    '^@errors/(.*)$': '<rootDir>/src/errors/$1',
    '^@middlewares/(.*)$': '<rootDir>/src/middlewares/$1',
    '^@root': '<rootDir>/src/root',
    '^@db': '<rootDir>/src/db',
    '^@api': '<rootDir>/src/api',
    '^@auth': '<rootDir>/src/auth',
    '^@utils': '<rootDir>/src/utils',
    '^@errors': '<rootDir>/src/errors',
    '^@middlewares': '<rootDir>/src/middlewares',
  },
}
