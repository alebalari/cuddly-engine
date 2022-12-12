import dotenv from 'dotenv';
import Configuration from './interfaces/configuration.interface';
import Logger from './logger.utils';

dotenv.config();

if (dotenv.config().error != null) {
	Logger.error('⚠️  Unable to locate your .env file ⚠️'); // error with .env file
	process.exit(1); // nodejs will stop immediately
}

const configuration: Configuration = {
	appName: String(process.env.API_NAME ?? 'app'),
	appVersion: String(process.env.API_VERSION ?? 'v1.0.0'),
	listeningPort: Number(process.env.PORT ?? 3001),
	mongoDbURL: String(process.env.MONGODB_URL),

	// utils/interfaces/configuration.interface.ts contains available options and their descriptions
	mongoOptions: {
		family: 4,
	},
};

export default configuration;
