import dotenv from 'dotenv';

interface configuration {
	appName?: string;
	appVersion?: string;
	port: number;
	dbURL: string;
	// mongoOptions: {};
}

const envFound = dotenv.config();

if (envFound.error != null) {
	throw new Error('🚧 Unable to locate .env file 🚧');
}

const appConfig: configuration = {
	appName: String(process.env.API_NAME),
	appVersion: String(process.env.API_VERSION),
	port: Number(process.env.PORT ?? 3001),
	dbURL: String(process.env.MONGODB_URL),
	// mongoOptions: {},
};

export default appConfig;
