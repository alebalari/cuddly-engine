import express, { Application } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import Logger from '../utils/logger.utils';
import mongooseConnection from './mongooseConnection';
import expresswares from './expresswares';
import _controllers from './_controllers';
import httpLogger from './httpLogger';
import errorHandling from './errorHandling';

export default class App {
	app: Application;
	port: number;

	constructor(controllers: Controller[], port: number) {
		this.app = express();
		this.port = port;

		mongooseConnection() // Initialize Mongoose connection to MongoDB server
			.then(() => {
				Logger.info(' ✅  Mongoose-MongoDB connection established'); // Mongoose connection successfull
			})
			.catch((err: Error) => {
				Logger.error('❌  Mongoose connnection failed to initialize:', err); // Initial mongoose connection error handling
				process.exit(1); // If the database connection fails, we can crash our app
			});
		expresswares(this.app)
			.then(() => {
				Logger.info(' ✅  Expresswares initialized'); // Expresswares loaded successfully
			})
			.catch((err: Error) => {
				Logger.error('❌  Expresswares failed to initialize:', err); // Error in code with default express middlewares
				process.exit(1); // Will crash app upon failure
			});
		_controllers(controllers, this.app)
			.then(() => {
				Logger.info(' ✅  Controllers initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  Controllers failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
		httpLogger(this.app)
			.then(() => {
				Logger.info(' ✅  HTTP Logger initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  HTTP Logger failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
		errorHandling(this.app)
			.then(() => {
				Logger.info(' ✅  Error Handling initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  Error handling failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
	}

	public async listen(): Promise<void> {
		this.app.listen(this.port);
	}
}
