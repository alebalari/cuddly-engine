import { Application } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose';
import Logger from '../middleware/logger';

export default async ({ loadersInit }: { loadersInit: Application }) => {
	await mongooseLoader();
	Logger.info('MongoDB Loaded and connected! ✌');
	await expressLoader({ app: loadersInit });
	Logger.info('Express loaded ✌');
};
