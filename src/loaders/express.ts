import { Application } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import initializeControllers from '../utils/controllers.utils';
import initializeMiddlewares from '../utils/middlewares.utils';
import Logger from '../utils/logger.utils';

export default function initializeExpress(app: Application, controllers: Controller[]) {
	// Initialize middlewares
	try {
		initializeMiddlewares(app);
		Logger.info('');
	} catch (err) {}

	// Initialize express controllers/routes
	try {
		initializeControllers(controllers, app);
		Logger.info('');
	} catch (err) {}
	// Initialize express error handling
}
