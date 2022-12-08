import mongoose from 'mongoose';
import config from '../config';
import Logger from '../middleware/logger';

export default async function MongooseLoader() {
	// MondoDB connection string
	const uri = config.dbURL;
	// MongoDB connection options
	const options = config.mongoOptions;

	// Connection to MongoDB using Mongoose
	const mongooseConnection = await mongoose.connect(uri, options);
	Logger.info('MongoDB connection established');
	return mongooseConnection.connection.db;
}
