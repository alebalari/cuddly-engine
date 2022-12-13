import { Application } from 'express';

export default interface CommonRoute {
	getName: () => string;
	configureRoutes: () => Application;
}
