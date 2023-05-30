// import { fileURLToPath } from 'url';

import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

// const dirname = (path: string) => fileURLToPath(new URL('.', path));

// const filename = (env: string) => `.env.${env}.json`;

convict.addFormats(convictFormatWithValidator);

export const EcommerceConfig = convict({
	env: {
		doc: 'The application environment',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	server: {
		port: {
			doc: 'The port to bind',
			format: 'port',
			default: 5172,
			env: 'PORT',
			arg: 'port'
		},
		url: {
			doc: 'The server URL',
			format: 'url',
			default: 'http://localhost:5172',
			env: 'SERVER_URL',
			arg: 'server-url'
		}
	},
	client: {
		url: {
			doc: 'The client URL',
			format: 'url',
			default: 'http://localhost:5173',
			env: 'CLIENT_URL',
			arg: 'client-url'
		}
	}
});

// EcommerceConfig.loadFile(`${dirname(import.meta.url)}${filename(EcommerceConfig.get('env'))}`);

// EcommerceConfig.validate({ allowed: 'strict' });
