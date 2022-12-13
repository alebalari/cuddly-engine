import App from './app';
import databaseConnection from './app/initializeDatabase';
import configuration from './utils/configuration.utils';
import Route from './utils/interfaces';
import Logger from './utils/logger.utils';

// Grab listening port
const port = configuration.listeningPort;
// Controllers
const routes: Route[] = [];
// MongoDB URI
const uri = configuration.mongoURL;
// MongoDB options
const options = configuration.mongoOptions;
// Create new instance of express app
const app = new App(routes, port, uri, options);

// Will only instantiate a new express app object if there is a successful mongoose-mongodb server connection established
databaseConnection(uri, options)
	.then(() => {
		app.listen();
	})
	.catch((err) => {
		Logger.error('⚠️   Oops something went wrong with App initialization:', err); // Thrown when express app fails to instantiate
	});
