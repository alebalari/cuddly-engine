import mongoose, { Connection } from 'mongoose';
import DatabaseOptions from '../common/interfaces/databaseOptions.interface';
import handleDbEvents from '../utils/handleDbEvents.utils';

// Declare the Mongoose connection
const mongooseConnection: Connection = mongoose.connection;
// Handling for events emitted by Mongoose connection
handleDbEvents(mongooseConnection);

export default async function initializeDatabaseConnection(mongoDbUri: string, mongoDbOptions: DatabaseOptions) {
	// Gets rid of deprecation warning from Mongoose about 'strictQuery' being switched back to default in Mongoose 7
	mongoose.set('strictQuery', true);
	// Connects to MongoDB database using the Mongoose Library
	await mongoose.connect(mongoDbUri, mongoDbOptions);
}
// Close the database connection when the application is terminated
export async function closeMongooseConnection() {
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
