import { Application } from 'express';
import initializeExpress from './express';
import initiliazeMongoose from './mongoose';
import Logger from '../utils/logger.utils';

async function Loaders(expressInit: Application) {
	await initiliazeMongoose().then(
		() => {
			Logger.info('Mongoose connection established ✌');
		},
		(err: Error) => {
			// callback executed when promise rejected
			Logger.error(`👎 Mongoose connection failed - ${err.message}`);
		}
	);
	await initializeExpress(expressInit).then(
		() => {
			Logger.info('Express server established ✌');
		},
		(err: Error) => {
			Logger.error(`👎 Express server failed - ${err.message}`);
		}
	);
}

export default Loaders;
