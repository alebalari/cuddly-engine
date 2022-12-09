import mongoose from 'mongoose';
import appConfig from '../config';
import Logger from '../utils/logger.utils';

async function initiliazeMongoose(): Promise<void> {
	const uri = appConfig.dbURL; // MondoDB server connection URI
	const options = appConfig.mongoOptions; // Mongoose connection options
	try {
		await mongoose.connect(uri, options); // Mongoose connection to MongoDB server
		Logger.info('Mongoose has connected to MongoDB ✌'); // Only logged upon successfull connection
	} catch (err) {
		Logger.error('👎 Failed to connect to MongoDB server using Mongoose. Error:', err); // Thrown when mongoose fails to connect
	}
}

export default initiliazeMongoose;
