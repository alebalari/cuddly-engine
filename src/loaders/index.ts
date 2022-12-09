import { Application } from 'express';
import initializeExpress from './express';
import initiliazeMongoose from './mongoose';
import Logger from '../utils/logger.utils';

async function Loaders(expressInit: Application) {
	await initiliazeMongoose();
	try {
		initializeExpress(expressInit, []);
		Logger.info('Express server established ✌');
	} catch (err) {
		if (err instanceof Error) {
			Logger.error(`👎 Express server failed - ${err.message}`);
		}
	}
}

export default Loaders;
