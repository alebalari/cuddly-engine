import { Application } from 'express';
import Logger from '../utils/logger.utils';
import morganMiddleware from '../utils/morgan.utils';

export default async function initializeHttpLogger(app: Application): Promise<void> {
	// Logs all HTTP requests to the console
	app.use(morganMiddleware);
	// Test route to make sure logger output is working properly
	app.get('/logger', (_, res) => {
		Logger.error('This is an error log');
		Logger.warn('This is a warn log');
		Logger.info('This is a info log');
		Logger.http('This is a http log');
		Logger.debug('This is a debug log');
		res.send('Logger is logging...');
	});
}
