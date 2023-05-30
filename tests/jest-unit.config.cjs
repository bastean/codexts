module.exports = {
	...require('./jest.config.cjs'),
	displayName: {
		name: 'Unit | Application/Domain',
		color: 'cyanBright'
	},
	testMatch: ['**/contexts/**/*.spec.ts'],
	coverageDirectory: 'reports/jest/unit'
};
