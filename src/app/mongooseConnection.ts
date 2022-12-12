import mongoose, { Connection } from 'mongoose';
import configuration from '../utils/configuration.utils';
import Logger from '../utils/logger.utils';
import handleMongooseEvent from '../utils/mongooseEvent.utils';

export default async function mongooseConnection(): Promise<void> {
	// Connection URI
	const uri = configuration.mongoDbURL;
	// Connection options
	const options = configuration.mongoOptions;
	// strictQuery is equal to strict by default as of Mongoose 6.0.10
	// Gets rid of deprecation warning from Mongoose about 'strictQuery' being switched back to default in Mongoose 7
	mongoose.set('strictQuery', true);
	// Connects to MongoDB database using the Mongoose Library
	await mongoose.connect(uri, options);
	// Declare the Mongoose connection to use
	const mongooseConnection: Connection = mongoose.connection;
	// These events are emitted after initial connection, you still need to handle errors for the initial connection itself at app/index.ts
	// Emitted when Mongoose starts making its initial connection to the MongoDB server
	handleMongooseEvent(mongooseConnection, 'connecting', (): void => {
		Logger.info(' 🟢  Mongoose has started its initial connection to the MongoDB server 🟢 ');
	});
	// Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
	handleMongooseEvent(mongooseConnection, 'connected', (): void => {
		Logger.info(' 🟢  Mongoose has succesffully made a connection to the MongoDB server 🟢 ');
	});
	// Emitted after 'connected' and onOpen is executed on all of this connection's models.
	handleMongooseEvent(mongooseConnection, 'open', (): void => {
		Logger.info(' 🟢  Mongoose has an open connection to the MongoDB server 🟢 ');
	});
	// Your app called Connection#close() to disconnect from MongoDB
	handleMongooseEvent(mongooseConnection, 'disconnecting', (): void => {
		Logger.info(' 🟡  Mongoose is disconnecting from the MongoDB server 🟡 ');
	});
	// Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
	handleMongooseEvent(mongooseConnection, 'disconnected', (): void => {
		Logger.info(' 🛑  Mongoose has lost its connection to the MongoDB server 🛑  ');
	});
	// Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
	handleMongooseEvent(mongooseConnection, 'close', (): void => {
		Logger.info(' 🛑  Mongoose connection was closed 🛑  ');
	});
	// Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
	handleMongooseEvent(mongooseConnection, 'reconnected', (): void => {
		Logger.info(' 🟢  Mongoose has successfully reconnected to the MongoDB server 🟢 ');
	});
	// Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
	handleMongooseEvent(mongooseConnection, 'error', (err: Error): void => {
		Logger.info(' ⚠️  Something went wrong with Mongoose: ', err);
	});

	// Close the connection when the application is terminated
	async function closeMongooseConnection() {
		return await new Promise<void>((resolve, reject) => {
			mongooseConnection.close((err) => {
				if (err != null) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
	// We listen for 'SIGINT' event which is emitted upon app termination
	process.on('SIGINT', () => {
		closeMongooseConnection()
			.then(() => {
				Logger.info(' 🛑  Mongoose process has exited through app termination  🛑'); // Successfull process termination
				Logger.info(' 🛑  Application has been terminated');
				process.exit(0);
			})
			.catch((err) => {
				Logger.info(' ⚠️  Error closing the Mongoose connection process:', err); // Unsuccessfull process termination
				process.exit(1);
			});
	});
}
