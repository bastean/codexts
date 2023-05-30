import { pathToFileURL } from 'url';

import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { globSync } from 'glob';
import slash from 'slash';

import { errorHandler } from '../../api/middleware/errorHandler';
import { validateSchema } from '../../api/middleware/validateSchema';
import { Log } from '../../container/Log';

const routing = Router();

const formatEndpoint = (endpointPath: string): string => {
	const formatEndpointPath = slash(endpointPath);

	const version = formatEndpointPath.split('/api')[1].split('/')[1];

	const endpoint = formatEndpointPath.split('/api')[1].split('/endpoints')[1].split('.').shift();

	if (version.match(/[v0-9]+/) && endpoint !== undefined) {
		return `/${version}${endpoint}`;
	}

	return '';
};

export const loadEndpoints = async (): Promise<Router> => {
	const endpoints = globSync('**/api/v*/endpoints/**/*.ts');

	await Promise.all(
		endpoints?.map(async (endpointPath) => {
			const importEndpointPath = pathToFileURL(endpointPath).toString();
			const endpointRoute = formatEndpoint(endpointPath);

			if (endpointRoute !== '') {
				const endpoint = (await import(importEndpointPath)) as {
					router: Router;
				};
				routing.use(
					endpointRoute,
					[
						param('*').trim().notEmpty().escape(),
						query('*').trim().notEmpty().escape(),
						body('*').trim().notEmpty().escape(),
						validateSchema
					],
					endpoint.router
				);
				Log.info(endpointRoute);
			}
		})
	);

	routing.use(errorHandler);

	return Promise.resolve(routing);
};
