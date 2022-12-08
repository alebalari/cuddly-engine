import express from 'express';
import Loaders from './loaders';
import config from './config';
import Logger from './middleware/logger';

async function serverInit() {
	Logger.info('Server Initialization 👋');
	const app = express();
	await Loaders({ loadersInit: app });
	const port = config.port;
	app
		.listen(port, () => {
			Logger.info(`Server Listening on port: ${port} 🤙`);
		})
		.on('error', (err) => {
			Logger.error(err);
			process.exit(1);
		});
}

serverInit().catch((error) => Logger.error(error));
