module.exports = api => {
    api.cache(true);
    const presets = [
        ['@babel/preset-env', {
            "modules": "cjs"
        }],
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
    ];
    return { presets, plugins };
};
