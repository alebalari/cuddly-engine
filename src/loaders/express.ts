import express from 'express';

function expressLoader({ app }: { app: express.Application }) {
	app.get('/status', (req, res) => {
		res.status(200).end();
	});
}

export default expressLoader;
