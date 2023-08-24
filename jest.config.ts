import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',
    testEnvironmentOptions: {
        // Enable debugging by adding the --inspect flag
        nodeOptions: ['--inspect', '--enable-source-maps'],
    },
    testEnvironment: 'node',
    detectOpenHandles: true,
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};

export default config;
