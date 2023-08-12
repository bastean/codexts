import cors from 'cors';

export const CORS = () => {
	const allowedQueryMethods = ['GET', 'POST'];
	const allowedCommandMethods = ['PUT', 'PATCH', 'DELETE'];
	const methods = [...allowedQueryMethods, ...allowedCommandMethods];
	const exposedHeaders = ['Authorization'];

	return cors({
		methods,
		exposedHeaders
	});
};
