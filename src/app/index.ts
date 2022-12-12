import express, { Application } from 'express';
import Controller from '../utils/interfaces/controller.interface';
import Logger from '../utils/logger.utils';
import initializeMongooseConnection from './initializeMongooseConnection';
import initializeExpresswares from './initializeExpresswares';
import initializeControllers from './initializeControllers';
import initializeHttpLogger from './initializeHTTPLogger';
import initializeErrorHandling from './initializeErrorHandling';

export default class App {
	app: Application;
	port: number;

	constructor(controllers: Controller[], port: number) {
		this.app = express();
		this.port = port;

		initializeMongooseConnection()
			.then(() => {
				Logger.info(' ✅   Mongoose connection successfully initialized'); // Mongoose connection successfull
			})
			.catch((err: Error) => {
				Logger.error('❌  Mongoose connnection failed to initialize:', err); // Initial mongoose connection error handling
				process.exit(1); // If the database connection fails, we can crash our app
			});
		initializeExpresswares(this.app)
			.then(() => {
				Logger.info(' ✅  Expresswares initialized'); // Expresswares loaded successfully
			})
			.catch((err: Error) => {
				Logger.error('❌  Expresswares failed to initialize:', err); // Error in code with default express middlewares
				process.exit(1); // Will crash app upon failure
			});
		initializeControllers(controllers, this.app)
			.then(() => {
				Logger.info(' ✅  Controllers initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  Controllers failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
		initializeHttpLogger(this.app)
			.then(() => {
				Logger.info(' ✅  HTTP Logger initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  HTTP Logger failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
		initializeErrorHandling(this.app)
			.then(() => {
				Logger.info(' ✅  Error Handling initialized');
			})
			.catch((err: Error) => {
				Logger.error('❌  Error handling failed to initialize:', err);
				process.exit(1); // Will crash app upon failure
			});
	}

	public async listen(): Promise<void> {
		this.app.listen(this.port, () => {
			Logger.info(` 👂  App is listening on port: ${this.port}`);
		});
	}
}
