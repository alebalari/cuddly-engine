import { Application } from 'express';
import Controller from '../utils/interfaces/controller.interface';

export default async function initializeControllers(controllers: Controller[], app: Application): Promise<void> {
	controllers.forEach((controller: Controller) => {
		app.use('/api', controller.router); // Will preprend /api before any routes
	});
}
