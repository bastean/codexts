import { unlinkSync } from 'fs';

import { $ } from 'execa';

const $$ = $({ stdio: 'inherit' });

const errorMessage = (error) => {
	console.log('\n> Upgrade Failed!');
	console.log('\n> Please, check "Error" or undo changes with: git reset --hard HEAD && npm ci\n');
	console.log(error);
	process.exit(1);
};

const shutdownGracefully = () => {
	errorMessage('> Shutdown Gracefully!');
};

process.on('SIGINT', shutdownGracefully);
process.on('SIGTERM', shutdownGracefully);

console.clear();

try {
	console.log('> Upgrading workspaces dependencies\n');
	await $$`npx ncu --root -ws -u`;

	console.log('\n> Installing new versions\n');
	unlinkSync('package-lock.json');
	await $$`PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm i --legacy-peer-deps`;

	console.log('\n> Running Lint\n');
	await $$`npm run lint:check`;

	console.log('\n> Running Tests\n');
	await $$`npm test`;

	console.log('\n> Commit changes\n');
	await $({
		stdio: 'inherit',
		shell: true
	})`git commit -am "fix(deps): upgrade workspaces dependencies"`;

	console.log('\n> Upgrade Completed!');
} catch (error) {
	errorMessage(error);
}
