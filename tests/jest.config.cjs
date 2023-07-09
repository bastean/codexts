module.exports = {
	transform: {
		'^.+\\.ts$': '@swc/jest'
	},
	extensionsToTreatAsEsm: ['.ts'],
	collectCoverage: true,
	verbose: true
};
