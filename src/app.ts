import express from 'express';
import appConfig from './config';
import Logger from './utils/logger.utils';
import Loaders from './loaders';

async function initializeServer() {
	Logger.info(`👋 Initiliazing ${appConfig.appName} API ${appConfig.appVersion}`);
	const app = express();
	await Loaders(app).catch((err: Error) => {
		Logger.error(`👎 Something is up with initialization: ${err.message}`);
	});
	const port = appConfig.port;
	app
		.listen(port, () => {
			Logger.info(`😁 🎉 API online and listening on PORT: ${port} 😁🎉`);
		})
		.on('error', (err) => {
			Logger.error(err);
			process.exit(1);
		});
}

initializeServer().catch((err) => Logger.error(err));
