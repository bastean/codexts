import cors from 'cors';

import { Config } from '../../container/Config';
import { Log } from '../../container/Log';

export const CORS = () => {
	const allowedDomains = [Config.get('client.url')];
	const allowedQueryMethods = ['GET', 'POST'];
	const allowedCommandMethods = ['PUT', 'PATCH', 'DELETE'];
	const methods = [...allowedQueryMethods, ...allowedCommandMethods];

	return Config.get('env') === 'production'
		? cors({
				methods,
				origin(origin, callback) {
					if (allowedDomains.includes(origin as string)) {
						callback(null, true);
					} else {
						Log.error(`Blocked by CORS: ${origin as string}`);
					}
				}
		  })
		: cors({
				methods
		  });
};
