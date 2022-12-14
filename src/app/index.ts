import express, { Application } from 'express';
import { CommonRoutes } from '../common/common.routes.config';
import errorHandling from './initializeErrorHandling';
import initializeExpresswares from './initializeExpresswares';
import Logger from '../utils/logger.utils';

export default class App {
	express: Application;
	port: number;

	constructor(port: number, routes: CommonRoutes[]) {
		this.express = express();
		this.port = port;

		this.expresswares();
		this.routes(routes);
		this.errorHandling();
	}

	private expresswares(): void {
		initializeExpresswares(this.express);
		Logger.info(' ✅  Express middleware initialized...');
	}

	private routes(routes: CommonRoutes[]): void {
		Logger.info(' ✅  Express routes initialized...');
		routes.forEach((route) => {
			this.express.use(route.configureRoutes());
			Logger.info(`     ✅  Route Configured: ${route.path}`);
		});
	}

	private errorHandling(): void {
		errorHandling(this.express);
		Logger.info(' ✅  Error middleware initialized...');
	}

	public listen(): void {
		this.express.listen(this.port);
		Logger.info(` 👂  App is running and listening on Port: ${this.port}`);
	}
}
