// import { fileURLToPath } from 'url';

import convict from 'convict';
import convictFormatWithValidator from 'convict-format-with-validator';

// const dirname = (path: string) => fileURLToPath(new URL('.', path));

// const filename = (env: string) => `.env.${env}.json`;

convict.addFormats(convictFormatWithValidator);

export const ConvictConfig = convict({
	env: {
		doc: 'Application environment',
		format: ['production', 'development', 'test'],
		default: 'development',
		env: 'NODE_ENV'
	},
	db: {
		uri: {
			doc: 'Database URI',
			format: '*',
			default: '',
			env: 'DB_URI'
		}
	},
	jwt: {
		privateKey: {
			doc: 'JWT Private Key',
			format: '*',
			default: '',
			env: 'JWT_PRIVATE_KEY'
		}
	},
	backend: {
		port: {
			doc: 'Backend port to bind',
			format: 'port',
			default: 3000,
			env: 'PORT'
		}
	}
});

// ConvictConfig.loadFile(`${dirname(import.meta.url)}${filename(ConvictConfig.get('env'))}`);

// ConvictConfig.validate({ allowed: 'strict' });
