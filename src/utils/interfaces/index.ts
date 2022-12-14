import DatabaseOptions from '../../common/interfaces/databaseOptions.interface';

export default interface Configuration {
	appName?: string;
	appVersion?: string;
	listeningPort: number;
	mongoURL: string;
	mongoOptions: DatabaseOptions;
}
