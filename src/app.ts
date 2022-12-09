import express from 'express';
import appConfig from './config';
import Logger from './utils/logger.utils';
import Loaders from './loaders';

const app = express();
const port = appConfig.appPort;

async function initializeServer() {
	Logger.info(`👋 Initiliazing API ${appConfig.appName} ${appConfig.appVersion}`);
	await Loaders(app).catch((err: Error) => {
		Logger.error(`👎 Something is up with initialization: ${err.message}`);
	});
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
