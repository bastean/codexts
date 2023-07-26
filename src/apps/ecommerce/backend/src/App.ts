import { Config } from './container/Config';
import { Database } from './container/Database';
import { Log } from './container/Log';
import { Express } from './server/Express';

export class App {
	private readonly server: Express;

	public constructor() {
		const port = Config.get('backend.port');
		this.server = new Express(port);
	}

	public get HTTPServer() {
		return this.server?.HTTPServer;
	}

	public async start() {
		console.clear();

		Log.info('Connecting database');

		await Database.connect();

		Log.info('Starting server');

		await this.server.listen();
	}

	public stop() {
		this.server.stop();
	}
}
