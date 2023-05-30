const common = {
	publishQuiet: true,
	formatOptions: { snippetInterface: 'synchronous' }
};

module.exports = {
	backend: {
		...common,
		format: [
			'progress-bar',
			'json:reports/cucumber/acceptance/backend/report.json',
			'html:reports/cucumber/acceptance/backend/report.html'
		],
		paths: ['apps/*/backend/features/**/*.feature'],
		import: ['apps/*/backend/features/step-definitions/**/*.steps.ts']
	},
	frontend: {
		...common,
		format: [
			'progress-bar',
			'json:reports/cucumber/acceptance/frontend/report.json',
			'html:reports/cucumber/acceptance/frontend/report.html'
		],
		paths: ['apps/*/frontend/features/**/*.feature'],
		import: ['apps/*/frontend/features/step-definitions/**/*.steps.ts']
	}
};
