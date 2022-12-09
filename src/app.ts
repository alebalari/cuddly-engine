import express from 'express';
import config from './config';
import Logger from './utils/logger.utils';
import Loaders from './loaders';

async function initializeServer() {
	Logger.info('Server Initialization 👋');
	const app = express();
	await Loaders(app).catch((err: Error) => {
		Logger.error(`👎 Something is up with initialization: ${err.message}`);
	});
	const port = config.port;
	app
		.listen(port, () => {
			Logger.info(`😁 🎉 Server online and listening on PORT: ${port} 😁🎉`);
		})
		.on('error', (err) => {
			Logger.error(err);
			process.exit(1);
		});
}

initializeServer().catch((err) => Logger.error(err));
