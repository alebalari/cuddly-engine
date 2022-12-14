import mongoose, { Connection } from 'mongoose';
import DatabaseOptions from '../common/interfaces/databaseOptions.interface';
import handleDbEvents from '../utils/handleDbEvents.utils';
import Logger from '../utils/logger.utils';

// Declare the Mongoose connection
const mongooseConnection: Connection = mongoose.connection;
// Handling for events emitted by Mongoose connection
handleDbEvents(mongooseConnection);

export default async function databaseConnection(mongoDbUri: string, mongoDbOptions: DatabaseOptions) {
	// Gets rid of deprecation warning from Mongoose about 'strictQuery' being switched back to default in Mongoose 7
	mongoose.set('strictQuery', true);
	// Connects to MongoDB database using the Mongoose Library
	await mongoose.connect(mongoDbUri, mongoDbOptions);
}
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
			Logger.info(' 🛑  Mongoose process has exited through app termination'); // Successfull process termination
			Logger.info(' 🛑  Application has been terminated');
			process.exit(0);
		})
		.catch((err) => {
			Logger.error(' ⚠️  Error closing the Mongoose connection process:', err); // Unsuccessfull process termination
			process.exit(1);
		});
});
