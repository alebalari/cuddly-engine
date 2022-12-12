import { Connection, Error } from 'mongoose';

// The 'MongooseEvent' type defines a function that accepts a mongoose connection,
// event name to listen for, and a callback function to handle the emitted event
type HandleMongooseEvent = (
	// Taking a Mongoose connection as an argument allow you to pass in any connection instance that you want to use.
	// Particularly useful when handling database events for multiple Mongoose connections
	connection: Connection,
	// Possible connection events emitted by Mongoose (https://mongoosejs.com/docs/connections.html)
	event: 'connecting' | 'connected' | 'open' | 'disconnecting' | 'disconnected' | 'close' | 'reconnected' | 'error' | 'fullsetup' | 'all',
	// Callback function to handle the event emitted
	callback: (err: Error) => void
) => void;

// The 'mongooseEvent' function implements the MongooseEvent type
const handleMongooseEvent: HandleMongooseEvent = (connection: Connection, event: string, callback: (err: Error) => void) => {
	connection.on(event, callback);
};

export default handleMongooseEvent;
