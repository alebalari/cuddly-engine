import express from 'express';
import Loaders from './loaders';
import config from './config';

async function serverInit() {
	console.log('Server Initialization 👋');
	const app = express();
	await Loaders({ loadersInit: app });
	const port = config.port;
	app
		.listen(port, () => {
			console.log(`Server Listening on port: ${port} 🤙`);
		})
		.on('error', (err) => {
			console.error(err);
			process.exit(1);
		});
}

serverInit().catch((error) => console.error(error));
