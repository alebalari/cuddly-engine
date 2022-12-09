import { Application } from 'express';
import Controller from './interfaces/controller.interface';

export default function initializeControllers(controllers: Controller[], app: Application): void {
	controllers.forEach((controller: Controller) => {
		app.use('/api', controller.router);
	});
}
