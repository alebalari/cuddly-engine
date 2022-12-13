import dotenv from 'dotenv';
import Configuration from './interfaces/configuration.interface';
import Logger from './logger.utils';

dotenv.config();

if (dotenv.config().error != null) {
	Logger.error('⚠️  Unable to locate your .env file ⚠️'); // error with .env file
	process.exit(1); // force app crash
}

const configuration: Configuration = {
	appName: String(process.env.API_NAME ?? 'app'),
	appVersion: String(process.env.API_VERSION ?? 'v1.0.0'),
	listeningPort: Number(process.env.PORT ?? 3001),
	mongoURL: String(process.env.MONGODB_URL),
	mongoOptions: {
		family: 4,
		autoIndex: false,
		socketTimeoutMS: 4500,
		serverSelectionTimeoutMS: 5000,
		maxPoolSize: 10,
		minPoolSize: 5,
	},
};

export default configuration;
