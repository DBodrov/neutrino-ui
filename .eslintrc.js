module.exports = {
  extends: ['react-app'],
  plugins: ['@emotion'],
  rules: {
    'no-console': ['error', {allow: ['info', 'warn', 'error']}],
    'no-debugger': 'error',
    'linebreak-style': 'off',
    '@emotion/pkg-renaming': 'error',
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
  },
};
