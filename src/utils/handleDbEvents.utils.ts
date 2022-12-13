import { Connection, Error } from 'mongoose';
import Logger from './logger.utils';
import { MongooseEvent } from './types/MongooseEvent.type';

// The 'databaseEvent' function implements the MongooseEvent type
const databaseEvent: MongooseEvent = (connection: Connection, event: string, callback: (err: Error) => void) => {
	connection.on(event, callback);
};

export default function handleDbEvents(dbConnection: Connection) {
	// These events are emitted when an initial connection is made, error handling still needs to be done for the initiation process itself
	// Emitted when Mongoose starts making its initial connection to the MongoDB server
	databaseEvent(dbConnection, 'connecting', (): void => {
		Logger.info(' 🟢  Mongoose has started its initial connection to the MongoDB server');
	});
	// Emitted when Mongoose successfully makes its initial connection to the MongoDB server, or when Mongoose reconnects after losing connectivity. May be emitted multiple times if Mongoose loses connectivity.
	databaseEvent(dbConnection, 'connected', (): void => {
		Logger.info(' 🟢  Mongoose has succesffully made a connection to the MongoDB server');
	});
	// Emitted after 'connected' and onOpen is executed on all of this connection's models.
	databaseEvent(dbConnection, 'open', (): void => {
		Logger.info(' 🟢  Mongoose has an open connection to the MongoDB server');
	});
	// Your app called Connection#close() to disconnect from MongoDB
	databaseEvent(dbConnection, 'disconnecting', (): void => {
		Logger.info(' 🟡  Mongoose is disconnecting from the MongoDB server');
	});
	// Emitted when Mongoose lost connection to the MongoDB server. This event may be due to your code explicitly closing the connection, the database server crashing, or network connectivity issues.
	databaseEvent(dbConnection, 'disconnected', (): void => {
		Logger.info(' 🛑  Mongoose has lost its connection to the MongoDB server');
	});
	// Emitted after Connection#close() successfully closes the connection. If you call conn.close(), you'll get both a 'disconnected' event and a 'close' event.
	databaseEvent(dbConnection, 'close', (): void => {
		Logger.info(' 🛑  Mongoose connection was closed');
	});
	// Emitted if Mongoose lost connectivity to MongoDB and successfully reconnected. Mongoose attempts to automatically reconnect when it loses connection to the database.
	databaseEvent(dbConnection, 'reconnected', (): void => {
		Logger.info(' 🟢  Mongoose has successfully reconnected to the MongoDB server');
	});
	// Emitted if an error occurs on a connection, like a parseError due to malformed data or a payload larger than 16MB.
	databaseEvent(dbConnection, 'error', (err: Error): void => {
		Logger.error('⚠️   Something went wrong with Mongoose:', err);
	});
}
