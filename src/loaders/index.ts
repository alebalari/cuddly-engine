import { Application } from 'express';
import initializeExpress from './express';
import initiliazeMongoose from './mongoose';
import Logger from '../utils/logger.utils';

async function Loaders(expressInit: Application): Promise<void> {
	await initiliazeMongoose();
	Logger.info('MongoDB Loaded ✌');
	await initializeExpress(expressInit);
	Logger.info('Express loaded ✌');
}

export default Loaders;
