import App from './app';
import configuration from './utils/configuration.utils';
import Logger from './utils/logger.utils';

// Grab listening port
const port = configuration.listeningPort;
// Create new instance of express app
const app = new App([], port);

app
	.listen()
	.then(() => {
		setTimeout(() => {
			Logger.info(` 👂  Express App is listening on port: ${app.port}`);
		}, 1000);
	})
	.catch((err: Error) => {
		Logger.error(' ⚠️  Oops something went wrong: ', err);
		process.exit(1);
	});
