import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
	throw new Error('🚧 Unable to locate .env file 🚧');
}

export default {
	port: process.env.PORT ?? 3001,
};
