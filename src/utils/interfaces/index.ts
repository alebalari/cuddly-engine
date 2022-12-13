import { Router } from 'express';

export interface Route {
	path: string;
	router: Router;
}

export interface MongoOptions {
	autoIndex?: boolean; // By default mongoose will automatically build indexes defined in the schema
	family?: number; // Use IPv4, skip trying IPv6, default action is IPv6 first then IPv4
	minPoolSize?: number; // The minimum number of sockets the MongoDB driver will keep open
	maxPoolSize?: number; // Maximum number of sockets the MongoDB driver will keep open
	serverSelectionTimeoutMS?: number; // The MongoDB driver will try to find a server to send operations to, and keep retrying for # milliseconds.
	socketTimeoutMS?: number; // How long the MongoDB driver will wait before killing a socket due to inactivity after initial connection
}

export interface Configuration {
	appName?: string;
	appVersion?: string;
	listeningPort: number;
	mongoURL: string;
	mongoOptions: MongoOptions;
}