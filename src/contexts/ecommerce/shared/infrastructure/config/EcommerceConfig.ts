// import { fileURLToPath } from 'url';

import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

// const dirname = (path: string) => fileURLToPath(new URL('.', path));

// const filename = (env: string) => `.env.${env}.json`;

convict.addFormats(convictFormatWithValidator);

export const EcommerceConfig = convict({
	env: {
		doc: 'Application environment',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	backend: {
		host: {
			doc: 'Backend host name/IP',
			format: '*',
			default: 'localhost',
			env: 'HOST',
			arg: 'host'
		},
		port: {
			doc: 'Backend port to bind',
			format: 'port',
			default: 5172,
			env: 'PORT',
			arg: 'port'
		}
	},
	frontend: {
		host: {
			doc: 'Frontend host name/IP',
			format: '*',
			default: 'localhost',
			env: 'FRONTEND_HOST',
			arg: 'frontend-host'
		},
		port: {
			doc: 'Frontend port to bind',
			format: 'port',
			default: 5173,
			env: 'FRONTEND_PORT',
			arg: 'frontend-port'
		}
	}
});

// EcommerceConfig.loadFile(`${dirname(import.meta.url)}${filename(EcommerceConfig.get('env'))}`);

// EcommerceConfig.validate({ allowed: 'strict' });
