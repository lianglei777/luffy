module.exports = {
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    extends: ['airbnb', 'airbnb/hooks', 'plugin:react/recommended'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    settings: {
        'import/resolver': {
            node: {
                extensions: ['.tsx', '.ts', '.js', '.json'],
            },
        },
    },
    plugins: ['react', '@typescript-eslint', 'prettier'],
    rules: {
        'no-tabs': 0,
        indent: 4,
    },
}
