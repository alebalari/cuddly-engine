import dotenv from 'dotenv';

interface configuration {
	appName?: string;
	appVersion?: string;
	appPort: number;
	dbURL: string;
	// @TO-DO Add the rest of the mongoclient options when time permits (http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html#.connect)
	mongoOptions?: {
		bufferMaxEntries?: number; // Sets cap on operations that are buffered during a nonworking connection, default is unlimited
		compression?: object; // Type of compression to use: snappy or zlib
		family?: number; // Use IPv4, skip trying IPv6, default action is IPv6 first then IPv4
		keepAlive?: boolean; // TCP Connection keep alive enabled
		keepAliveInitialDelay?: number; // The number of milliseconds to wait before initiating keepAlive on the TCP socket
		poolSize?: number; // Maximum size of the individual server pool
		reconnectTries?: number; // Server attempt to reconnect #times
		reconnectInterval?: number; // Server will wait # miliseconds between retries
		socketTimeoutMS?: number; // Close sockets after 45 seconds of inactivity
	};
}

const envFound = dotenv.config();

if (envFound.error != null) {
	throw new Error('🚧 Unable to locate .env file 🚧');
}

const appConfig: configuration = {
	appName: String(process.env.API_NAME ?? 'app'),
	appVersion: String(process.env.API_VERSION ?? 'v1.0.0'),
	appPort: Number(process.env.PORT ?? 3001),
	dbURL: String(process.env.MONGODB_URL),
	mongoOptions: {
		family: 4,
	},
};

export default appConfig;
