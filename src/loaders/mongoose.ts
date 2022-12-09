import mongoose from 'mongoose';
import appConfig from '../config';
import Logger from '../utils/logger.utils';

async function initiliazeMongoose() {
	// MondoDB connection string
	const uri = appConfig.dbURL;
	// MongoDB connection options
	// const options = appConfig.mongoOptions;
	// remember to add options argument to mongoose.connect function
	// Connection to MongoDB using Mongoose
	await mongoose.connect(uri).then(
		() => {
			// callback executed when promise resolved
			Logger.info('✌ Mongoose connection initialized');
		},
		(err: Error) => {
			// callback executed when promise rejected
			Logger.error(`👎 Mongoose initialization failed - ${err.message}`);
		}
	);
}

export default initiliazeMongoose;
