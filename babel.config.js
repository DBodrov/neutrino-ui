module.exports = api => {
  api.cache.using(() => process.env.NODE_ENV);
  const presets = [
    [
      '@babel/preset-env',
      {
        modules: 'cjs',
      },
    ],
    '@babel/preset-react',
    '@babel/preset-typescript',
    [
      '@emotion/babel-preset-css-prop',
      {
        autoLabel: true,
        labelFormat: '[local]',
      },
    ],
  ];

  const plugins = [
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-export-namespace-from',
    '@babel/plugin-proposal-export-default-from',
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    'emotion',
    !api.env('production') && 'react-refresh/babel',
  ].filter(Boolean);
  return {presets, plugins};
};
