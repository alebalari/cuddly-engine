import { MongoOptions } from './MongoOptions.interfaces';

export default interface Configuration {
	appName?: string;
	appVersion?: string;
	listeningPort: number;
	mongoURL: string;
	mongoOptions: MongoOptions;
}
