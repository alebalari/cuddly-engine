import express from 'express';
import App from './app';
import databaseConnection from './app/initializeDatabase';
import { CommonRoutes } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import configuration from './utils/configuration.utils';
import Logger from './utils/logger.utils';

// Declare express application to pass as argument to our routes
const application = express();
// Grab listening port
const port = configuration.listeningPort;
// Adding our routes
const routes: CommonRoutes[] = [new UsersRoutes(application)];
// MongoDB URI
const uri = configuration.mongoURL;
// MongoDB options
const options = configuration.mongoOptions;
// Create new instance of express app
const app = new App(port, uri, options, routes);

// Will only instantiate a new express app object if there is a successful mongoose-mongodb server connection established
databaseConnection(uri, options)
	.then(() => {
		app.listen();
	})
	.catch((err) => {
		Logger.error('⚠️   Oops something went wrong with App initialization:', err); // Thrown when express app fails to instantiate
	});
