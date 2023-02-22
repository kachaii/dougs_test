const baseStyleRules = require('eslint-config-airbnb-base/rules/style').rules;

const dangleRules = baseStyleRules['no-underscore-dangle'];

module.exports = {
    env: {
        browser: true,
    },

    rules: {
        'class-methods-use-this': 'off',
        'no-underscore-dangle': [
            dangleRules[0],
            {
                ...dangleRules[1],
                allow: dangleRules[1].allow.concat(['__karma__']),
            },
        ],

        // IMPORT
        'import/default': 'error',
        'import/namespace': 'error',
        'import/imports-first': 'error',
        indent: ['error', 4, {
            SwitchCase: 1,
            VariableDeclarator: 1,
            outerIIFEBody: 1,
            FunctionDeclaration: {
                parameters: 1,
                body: 1,
            },
            FunctionExpression: {
                parameters: 1,
                body: 1,
            },
            CallExpression: {
                arguments: 1,
            },
            ArrayExpression: 1,
            ObjectExpression: 1,
            ImportDeclaration: 1,
            flatTernaryExpressions: false,
            ignoreComments: false,
        }],
    },

    settings: {
        // Append 'ts' extension to Airbnb 'import/resolver' setting
        'import/resolver': {
            node: {
                extensions: ['.js', '.ts', '.d.ts', '.json'],
            },
        },
        // Append 'ts' extension to Airbnb 'import/extensions' setting
        'import/extensions': ['.js', '.ts', '.mjs'],
    },

    overrides: [
        {
            files: ['*.ts'],
            parser: '@typescript-eslint/parser',
            plugins: ['@typescript-eslint'],
            rules: {
                'no-unused-vars': ['error', { vars: 'all', args: 'none', ignoreRestSiblings: true }],
                'no-useless-constructor': 'off',

                // IMPORT
                'import/prefer-default-export': 'off',

                // TYPESCRIPT
                '@typescript-eslint/adjacent-overload-signatures': 'error',
                '@typescript-eslint/naming-convention': 'error',
                '@typescript-eslint/member-delimiter-style': 'error',
                '@typescript-eslint/member-ordering': [
                    'error',
                    {
                        default: [
                            'public-field',
                            'private-field',
                            'constructor',
                            'public-method',
                            'private-method',
                        ],
                    },
                ],
                '@typescript-eslint/no-array-constructor': 'error',
                '@typescript-eslint/no-empty-interface': 'error',
                '@typescript-eslint/no-for-in-array': 'error',
                '@typescript-eslint/no-inferrable-types': 'error',
                '@typescript-eslint/no-require-imports': 'error',
                '@typescript-eslint/no-unused-vars': [
                    'error',
                    { vars: 'all', args: 'none', ignoreRestSiblings: true },
                ],
                '@typescript-eslint/no-use-before-define': 'error',
                '@typescript-eslint/no-useless-constructor': 'error',
                '@typescript-eslint/prefer-namespace-keyword': 'error',
                '@typescript-eslint/type-annotation-spacing': 'error',
            },
        },
        {
            files: ['*.{spec,e2e-spec}.ts', 'protractor.conf.js'],
            env: {
                jasmine: true,
                node: true,
            },
        },
    ],
};
