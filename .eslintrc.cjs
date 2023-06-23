module.exports = {
	root: true,
	env: {
		es2020: true,
		node: true,
		browser: true,
		jest: true
	},
	plugins: [
		'@typescript-eslint',
		'import',
		'unused-imports',
		'check-file',
		'security',
		'no-secrets',
		'hexagonal-architecture'
	],
	extends: [
		'airbnb-base',
		'plugin:@typescript-eslint/recommended',
		'plugin:@typescript-eslint/recommended-requiring-type-checking',
		'airbnb-typescript/base',
		'plugin:security/recommended',
		'prettier'
	],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true
		},
		tsconfigRootDir: __dirname,
		project: ['./tsconfig.eslint.json', './src/apps/*/*/tsconfig.eslint.json'],
		extraFileExtensions: ['.svelte']
	},
	settings: {
		'import/parsers': {
			'@typescript-eslint/parser': ['.ts']
		},
		'import/resolver': {
			typescript: {
				alwaysTryTypes: true,
				project: ['./tsconfig.eslint.json', './src/apps/*/*/tsconfig.eslint.json']
			}
		}
	},
	overrides: [
		{
			files: ['src/contexts/*/*/**'],
			rules: {
				'hexagonal-architecture/enforce': ['error']
			}
		},
		{
			files: ['tests/**'],
			plugins: ['jest', 'playwright'],
			extends: [
				'plugin:jest/recommended',
				'plugin:jest/style',
				'plugin:playwright/playwright-test'
			],
			rules: {
				'jest/expect-expect': 'off',
				'jest/no-mocks-import': 'off',
				'jest/no-standalone-expect': 'off'
			}
		},
		{
			files: ['*.svelte'],
			plugins: ['svelte'],
			extends: ['plugin:svelte/recommended', 'plugin:svelte/prettier'],
			parser: 'svelte-eslint-parser',
			parserOptions: {
				parser: '@typescript-eslint/parser'
			},
			rules: {
				/*
				 *  'svelte' - Possible Errors
				 */
				'svelte/infinite-reactive-loop': 'error',
				'svelte/no-dom-manipulating': 'error',
				'svelte/no-dupe-on-directives': 'error',
				'svelte/no-dupe-use-directives': 'error',
				'svelte/no-export-load-in-svelte-module-in-kit-pages': 'error',
				'svelte/no-store-async': 'error',
				'svelte/require-store-callbacks-use-set-param': 'error',
				'svelte/require-store-reactive-access': 'error',
				'svelte/valid-prop-names-in-kit-pages': 'error',

				/*
				 *  'svelte' - Security Vulnerability
				 */
				'svelte/no-target-blank': 'error',

				/*
				 *  'svelte' - Best Practices
				 */
				'svelte/block-lang': [
					'error',
					{
						script: 'ts',
						style: 'postcss'
					}
				],
				'svelte/button-has-type': 'error',
				'svelte/no-reactive-functions': 'error',
				'svelte/no-reactive-literals': 'error',
				'svelte/no-useless-mustaches': [
					'error',
					{
						ignoreIncludesComment: true,
						ignoreStringEscape: true
					}
				],
				'svelte/prefer-destructured-store-props': 'error',
				'svelte/require-event-dispatcher-types': 'error',
				'svelte/require-optimized-style-attribute': 'error',
				'svelte/require-stores-init': 'error',

				/*
                 !  TypeScript - Overwritten
                 */
				'@typescript-eslint/no-unsafe-assignment': 'off',
				'@typescript-eslint/no-unsafe-member-access': 'off',

				/*
                  !  Airbnb - Overwritten
                  */
				'import/no-mutable-exports': 'off',
				'import/no-unresolved': 'off',
				'import/extensions': 'off',
				'import/no-duplicates': 'off'
			}
		},
		{
			files: ['src/apps/*/{backend,cli}/**'],
			rules: {
				'no-console': 'off' //! Airbnb - Overwritten
			}
		}
	],
	rules: {
		/*
		 *  'eslint' - Suggestions
		 */
		'class-methods-use-this': 'off', //! Airbnb - Overwritten
		'no-restricted-globals': 'off', //! Airbnb - Overwritten

		/*
		 *  '@typescript-eslint' - Supported Rules
		 */
		'@typescript-eslint/consistent-type-exports': 'error',
		'@typescript-eslint/consistent-type-imports': 'error',
		'@typescript-eslint/explicit-function-return-type': [
			'error',
			{
				allowExpressions: true,
				allowConciseArrowFunctionExpressionsStartingWithVoid: true,
				allowFunctionsWithoutTypeParameters: true,
				allowIIFEs: true
			}
		],
		'@typescript-eslint/explicit-member-accessibility': 'error',
		'@typescript-eslint/member-ordering': 'error',
		'@typescript-eslint/method-signature-style': ['error', 'method'],
		'@typescript-eslint/naming-convention': [
			'error',
			{
				selector: 'default',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE']
			},
			{
				selector: ['variableLike'],
				types: ['boolean'],
				format: ['PascalCase'],
				prefix: ['is', 'can', 'has', 'should', 'did', 'will']
			},
			{
				selector: 'parameter',
				format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
				leadingUnderscore: 'allow'
			},
			{
				selector: 'typeLike',
				format: ['PascalCase']
			}
		],
		'@typescript-eslint/no-duplicate-type-constituents': 'error',
		'@typescript-eslint/no-import-type-side-effects': 'error',
		'@typescript-eslint/no-misused-promises': 'off', //! TypeScript - Overwritten
		'@typescript-eslint/no-redundant-type-constituents': 'error',
		'@typescript-eslint/no-unnecessary-qualifier': 'error',
		'@typescript-eslint/no-useless-empty-export': 'error',
		'@typescript-eslint/prefer-enum-initializers': 'error',
		'@typescript-eslint/prefer-readonly': 'error',
		'@typescript-eslint/require-array-sort-compare': [
			'error',
			{
				ignoreStringArrays: true
			}
		],
		'@typescript-eslint/strict-boolean-expressions': 'error',

		/*
		 *  '@typescript-eslint' - Extension Rules
		 */
		'@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }], //! Airbnb - Overwritten

		/*
		 *  'import' - Helpful warnings
		 */
		'import/no-extraneous-dependencies': 'off', //! Airbnb - Overwritten

		/*
		 *  'import' - Style guide
		 */
		'import/order': [
			//! Airbnb - Overwritten
			'error',
			{
				'groups': [
					'builtin',
					'external',
					'internal',
					'parent',
					'sibling',
					'index',
					'object',
					'type',
					'unknown'
				],
				'alphabetize': {
					order: 'asc',
					orderImportKind: 'asc',
					caseInsensitive: true
				},
				'newlines-between': 'always'
			}
		],
		'import/prefer-default-export': 'off', //! Airbnb - Overwritten

		/*
		 *  'unused-imports'
		 */
		'unused-imports/no-unused-imports': 'error',

		/*
		 *  'check-file'
		 */
		'check-file/folder-match-with-fex': [
			'error',
			{
				'*.{feature,steps,test,spec}.ts': 'tests/**'
			}
		],

		/*
		 *  'no-secrets'
		 */
		'no-secrets/no-secrets': 'error'
	},
	noInlineConfig: true,
	reportUnusedDisableDirectives: true,
	ignorePatterns: ['scripts/**', '*.config.*', '*.cjs']
};
