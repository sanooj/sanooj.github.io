import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
preset: 'ts-jest',
testEnvironment: 'jsdom',
roots: ['<rootDir>/src'],
setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/src/__mocks__/fileMock.ts'
},
testMatch: [
    '**/__tests__/**/*.+(ts|tsx|js)',
    '**/?(*.)+(spec|test).+(ts|tsx|js)'
],
moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
collectCoverage: true,
coverageDirectory: 'coverage',
coverageReporters: ['text', 'lcov'],
coverageThreshold: {
    global: {
    branches: 80,
    functions: 80,
    lines: 80,
    statements: 80
    }
},
transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest'
}
};

export default config;

