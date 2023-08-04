import { App } from './App';
import { Log } from './container/Log';

process.on('uncaughtException', (error, origin) => {
	Log.error(`Caught exception: ${error.name} ${error.message} | Exception origin: ${origin}`);
	setTimeout(() => {
		process.exit(1);
	}, 3000);
});

const app = new App();
await app.start();

const shutdownGracefully = () => app.stop();

process.on('SIGINT', shutdownGracefully);
process.on('SIGTERM', shutdownGracefully);
