import { Connection } from 'mongoose';

// The 'MongooseEvent' type defines a function that accepts a mongoose connection,
// event name to listen for, and a callback function to handle the emitted event
export type MongooseEvent = (
	// Taking a Mongoose connection as an argument allow you to pass in any connection instance that you want to use.
	// Particularly useful when handling database events for multiple Mongoose connections
	connection: Connection,
	// Possible connection events emitted by Mongoose (https://mongoosejs.com/docs/connections.html)
	event:
		| 'connecting'
		| 'connected'
		| 'open'
		| 'disconnecting'
		| 'disconnected'
		| 'close'
		| 'reconnected'
		| 'error'
		| 'fullsetup'
		| 'all',
	// Callback function to handle the event emitted
	callback: (err: Error) => void
) => void;
