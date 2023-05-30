module.exports = {
	...require('./jest.config.cjs'),
	displayName: {
		name: 'Integration | Infrastructure',
		color: 'cyanBright'
	},
	testMatch: ['**/contexts/**/*.test.ts'],
	coverageDirectory: 'reports/jest/integration'
};
