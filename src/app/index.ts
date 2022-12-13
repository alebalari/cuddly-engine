import express, { Application, Router } from 'express';
import Logger from '../utils/logger.utils';
import expresswares from './initializeExpresswares';
import errorHandling from './initializeErrorHandling';
import { Route, MongoOptions } from '../utils/interfaces';

import databaseConnection from './initializeDatabase';

export default class App {
	express: Application;
	port: number;

	constructor(routes: Route[], port: number, mongoUri: string, mongoOptions: MongoOptions) {
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

	private initializeRoutes(routes: Route[]): void {
		routes.forEach((route: Route) => {
			this.express.use('/api', Router());
		});
		Logger.info(' ✅  Routes initialized...');
	}

	private initializeErrorHandling(): void {
		errorHandling(this.express);
		Logger.info(' ✅  Error middleware initialized...');
	}

	private initializeDatabase(mongoUri: string, mongoOptions: MongoOptions): void {
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
