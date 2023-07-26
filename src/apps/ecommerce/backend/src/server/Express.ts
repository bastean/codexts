import compression from 'compression';
import express from 'express';
import helmet from 'helmet';
import httpStatus from 'http-status';

import { Log } from '../container/Log';

import { CORS, DOS, loadEndpoints } from './configs';

import type { NextFunction, Request, Response } from 'express';
import type * as http from 'http';

export class Express {
	private readonly port: number;

	private readonly express: express.Express;

	private httpServer?: http.Server;

	public constructor(port: number) {
		this.port = port;
		this.express = express();

		this.express.disable('x-powered-by');

		this.express.use(express.json());
		this.express.use(compression());
		this.express.use(helmet());

		this.express.use(CORS());
		this.express.use(DOS());
	}

	public get HTTPServer() {
		return this.httpServer;
	}

	public async listen() {
		Log.info('Loading endpoints');

		this.express.use(await loadEndpoints());

		this.express.all('/', (req: Request, res: Response) => {
			res.status(httpStatus.OK).send();
		});

		this.express.all('*', (req: Request, res: Response) => {
			res.status(httpStatus.NOT_FOUND).send();
		});

		this.express.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
			Log.error(`Caught exception: ${err.name} ${err.message}`);
			res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message: 'Failed, please try again' });
		});

		Log.info('Endpoints loaded successfully');

		this.httpServer = this.express.listen(this.port, () => {
			Log.info(`Server listening on PORT: '${this.port}'`);
		});
	}

	public stop() {
		if (this.httpServer) {
			this.httpServer.close(() => {
				Log.info(`Server stopped on PORT: '${this.port}'`);
			});
		}
	}
}
