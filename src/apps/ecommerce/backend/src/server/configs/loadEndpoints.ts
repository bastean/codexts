import { pathToFileURL } from 'url';

import { Router } from 'express';
import { body, query, param } from 'express-validator';
import { globSync } from 'glob';

import { errorHandler } from '../../api/middleware/errorHandler';
import { validateSchema } from '../../api/middleware/validateSchema';
import { verifyJWT } from '../../api/middleware/verifyJWT';
import { Log } from '../../container/Log';

const routing = Router();

const formatEndpointRawPath = (rawPath: string): string | undefined => {
	let formattedPath: string | undefined;

	const version = rawPath.split('/api')[1].split('/')[1];

	const endpoint = rawPath.split('/api')[1].split('/endpoints')[1].split('.').shift();

	if (version.match(/[v0-9]+/) && endpoint !== undefined) formattedPath = `/${version}${endpoint}`;

	return formattedPath;
};

const initEndpoints = async (rawPath: string): Promise<void> => {
	const endpoint = formatEndpointRawPath(rawPath);

	if (endpoint === undefined) return;

	const middleware = [
		param('*').notEmpty(),
		query('*').notEmpty(),
		body('*').notEmpty(),
		validateSchema,
		verifyJWT
	];

	const { router } = (await import(pathToFileURL(rawPath).toString())) as {
		router: Router;
	};

	routing.use(endpoint, middleware, router);

	Log.info(endpoint);
};

export const loadEndpoints = async (): Promise<Router> => {
	const endpointsRawPaths = globSync('**/api/v*/endpoints/**/*.ts');

	await Promise.all(endpointsRawPaths?.map(initEndpoints));

	routing.use(errorHandler);

	return Promise.resolve(routing);
};
