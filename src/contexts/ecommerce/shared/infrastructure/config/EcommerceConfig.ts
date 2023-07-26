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
		port: {
			doc: 'Backend port to bind',
			format: 'port',
			default: 3000,
			env: 'PORT'
		}
	},
	db: {
		uri: {
			doc: 'Database URI',
			format: '*',
			default: '',
			env: 'DB_URI'
		}
	}
});

// EcommerceConfig.loadFile(`${dirname(import.meta.url)}${filename(EcommerceConfig.get('env'))}`);

// EcommerceConfig.validate({ allowed: 'strict' });
