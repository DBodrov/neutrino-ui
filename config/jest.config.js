// {
//     "moduleFileExtensions": ["js", "jsx", "ts", "tsx", "svg"],
//     "moduleDirectories": ["node_modules"],
//     "rootDir": "../",
//     "setupFiles": ["<rootDir>/config/jest.init.js"],
//     "testEnvironment": "jsdom",
//     "moduleNameMapper": {
//         "^src/(.*)": "<rootDir>/src/$1",
//         "^@elements-ui/themes": "<rootDir>/src/Themes"
//     },
//     "snapshotSerializers": ["jest-emotion"],
//     "verbose": true,
//     "transform": {
//         "^.+\\.(jsx?|tsx?)$": "babel-jest",
//         "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/config/jest.fileTransformer.js"
//     }
// }

process.env.NODE_ENV = 'test';

module.exports = {
  rootDir: '../',
  roots: ['src'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  verbose: true,
  testMatch: ['**/src/**/?(*.)+(test).[jt]s?(x)'],
  moduleDirectories: ['node_modules'],
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1',
    // '^test/(.*)': '<rootDir>/test/$1',
    // '^lib/(.*)': '<rootDir>/src/lib/$1',
    // '^ui-kit/(.*)': '<rootDir>/src/lib/ui-kit/$1',
    // '^components/(.*)': '<rootDir>/src/components/$1',
    // '^assets/(.*)': '<rootDir>/src/assets/$1',
    // '^pages/(.*)': '<rootDir>/src/pages/$1',
    // '^screens/(.*)': '<rootDir>/src/screens/$1',
    // '^services/(.*)': '<rootDir>/src/services/$1',
    // '^services': '<rootDir>/src/services',
    // '^hooks': '<rootDir>/src/hooks',
    // '^providers': '<rootDir>/src/providers',
    // '^context/(.*)': '<rootDir>/src/context/$1',
    // '^context': '<rootDir>/src/context',
    // '^typings': '<rootDir>/src/typings',
    // '^utils/(.*)': '<rootDir>/src/utils/$1',
    // '^icons': '<rootDir>/src/icons',
  },
  snapshotSerializers: ['@emotion/jest'],
  setupFiles: [require.resolve('whatwg-fetch')],
  transform: {
    '^.+\\.(js|jsx|mjs|cjs|ts|tsx)$': require.resolve('react-scripts/config/jest/babelTransform'),
    '^.+\\.css$': require.resolve('react-scripts/config/jest/cssTransform.js'),
    '^(?!.*\\.(js|jsx|mjs|cjs|ts|tsx|css|json)$)': require.resolve(
      'react-scripts/config/jest/fileTransform.js',
    ),
  },
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$'],
  resetMocks: true,
  setupFilesAfterEnv: ['<rootDir>/config/setupTests.js'],
};
