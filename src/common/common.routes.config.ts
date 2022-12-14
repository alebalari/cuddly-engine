import { Application } from 'express';

export abstract class CommonRoutes {
	app: Application;
	path: string;

	constructor(app: Application, path: string) {
		this.app = app;
		this.path = path;
		this.configureRoutes();
	}

	abstract configureRoutes(): Application;
}
