import express, { Application } from 'express';
import Logger from '../utils/logger.utils';
import expresswares from './initializeExpresswares';
import errorHandling from './initializeErrorHandling';
import databaseConnection from './initializeDatabase';
import { CommonRoutes } from '../common/common.routes.config';
import DatabaseOptions from '../common/interfaces/databaseOptions.interface';

export default class App {
	express: Application;
	port: number;

	constructor(port: number, mongoUri: string, mongoOptions: DatabaseOptions, routes: CommonRoutes[]) {
		this.express = express();
		this.port = port;

		this.initializeExpresswares();
		this.initializeRoutes(routes);
		this.initializeErrorHandling();
		this.initializeDatabase(mongoUri, mongoOptions);
	}

	private initializeExpresswares(): void {
		expresswares(this.express);
		Logger.info(' ✅  Express middleware initialized...');
	}

	private initializeRoutes(routes: CommonRoutes[]): void {
		routes.forEach((route) => {
			this.express.use(route.configureRoutes());
			Logger.info(`${route.routeName()} has initialized`);
		});
	}

	private initializeErrorHandling(): void {
		errorHandling(this.express);
		Logger.info(' ✅  Error middleware initialized...');
	}

	private initializeDatabase(mongoUri: string, mongoOptions: DatabaseOptions): void {
		Logger.info(' ✅  Database connection initialized...');
		databaseConnection(mongoUri, mongoOptions)
			.then(() => {
				Logger.info(' 🙌  Connection with MongoDB server established');
			})
			.catch((err: Error) => {
				Logger.error('⚠️   Connection with MongoDB could not be established:', err);
			});
	}

	public listen(): void {
		this.express.listen(this.port);
		Logger.info(` 👂  App is running and listening on Port: ${this.port}`);
	}
}
