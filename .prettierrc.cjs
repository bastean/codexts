module.exports = {
	/*
	 * Rules
	 */
	printWidth: 100,
	quoteProps: 'consistent',
	singleAttributePerLine: true,
	singleQuote: true,
	trailingComma: 'none',
	useTabs: true,
	/*
	 * Plugins
	 */
	pluginSearchDirs: false,
	plugins: ['prettier-plugin-svelte', 'prettier-plugin-tailwindcss'],
	/*
	 * 'svelte'
	 */
	overrides: [{ files: '*.svelte', options: { parser: 'svelte' } }]
};
