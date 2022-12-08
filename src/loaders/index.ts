import { Application } from 'express';
import expressLoader from './express';
import Logger from './logger';

export default async ({ loadersInit }: { loadersInit: Application }) => {
	await expressLoader({ app: loadersInit });
	Logger.info('Express loaded ✌');
};
