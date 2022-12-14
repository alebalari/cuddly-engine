import express from 'express';
import App from './app';
import { CommonRoutes } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import configuration from './utils/configuration.utils';
import Logger from './utils/logger.utils';
import initializeDatabaseConnection from './database';

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
const app = new App(port, routes);

// Will only instantiate a new express app object if there is a successful mongoose-mongodb server connection established
initializeDatabaseConnection(uri, options)
	.then(() => {
		Logger.info(' 🙌  Connection with MongoDB server established');
		app.listen();
	})
	.catch(() => {
		Logger.error('⚠️   Connection with MongoDB could not be established...');
		setTimeout(() => {
			Logger.error('⚠️   Oops server failed to initialize...');
		}, 500);
	});
