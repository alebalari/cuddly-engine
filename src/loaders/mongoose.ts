import mongoose from 'mongoose';
import config from '../config';
import Logger from '../utils/logger.utils';

async function initiliazeMongoose() {
	// MondoDB connection string
	const uri = config.dbURL;
	// MongoDB connection options
	const options = config.mongoOptions;
	// Connection to MongoDB using Mongoose
	await mongoose.connect(uri, options).then(
		() => {
			// callback executed when promise resolved
			Logger.info('✌ Mongoose connection succeeded');
		},
		(err: Error) => {
			// callback executed when promise rejected
			Logger.error(`👎 Mongoose connection failed - ${err.message}`);
		}
	);
}

export default initiliazeMongoose;
