import express from 'express';
import App from './app';
import { CommonRoutes } from './common/common.routes.config';
import { UsersRoutes } from './users/users.routes.config';
import configuration from './utils/configuration.utils';
import Logger from './utils/logger.utils';
import initializeDatabaseConnection, { closeMongooseConnection } from './database';
// Declare express application to pass as argument to our routes
const expressApp = express();
// Grab listening port
const port = configuration.listeningPort;
// Adding our routes
const routes: CommonRoutes[] = [new UsersRoutes(expressApp)];
// MongoDB URI
const databaseUri = configuration.mongoURL;
// MongoDB options
const databaseOptions = configuration.mongoOptions;
// Create new instance of express app
const app = new App(port, routes);

// Express server will only start listening if there is a successful mongoose-mongodb server connection established
initializeDatabaseConnection(databaseUri, databaseOptions)
	.then(() => {
		Logger.info(' 🙌  Connection with MongoDB server established');
		app.listen();
	})
	.catch(() => {
		Logger.error('⚠️   Connection with MongoDB could not be established...'); // If the database connection fails, the express server fails to start listening
		setTimeout(() => {
			Logger.error('⚠️   Oops server failed to initialize...');
			process.exit(1);
		}, 500);
	});

// Safely terminate our application and database connection
// We listen for 'SIGINT' event which is emitted upon app termination(ctrl + c)
process.on('SIGINT', () => {
	closeMongooseConnection()
		.then(() => {
			Logger.info(' 🛑  Mongoose process has exited through app termination.'); // Successfull process termination
			Logger.info(' 🛑  Server has been terminated.');
			process.exit(0);
		})
		.catch((err) => {
			Logger.error(' ⚠️  Error closing the Mongoose connection process:', err); // Unsuccessfull process termination
			process.exit(1);
		});
});
