import App from './app';
import configuration from './utils/configuration.utils';
import Logger from './utils/logger.utils';

const port = configuration.listeningPort;
const app = new App([], port);

app.listen().catch((err: Error) => {
	Logger.error('Oops something went wrong: ', err);
});
