import compression from 'compression';
import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';

export default async function initializeExpresswares(app: Application) {
	// Applies to all express requests
	app.use((req, res, next) => {
		// Helpful HTTP header
		res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`);
		// Cleans up URLS -- /mywebpage/ -> /mywebpage
		if (req.path.endsWith('/') && req.path.length > 1) {
			const query = req.url.slice(req.path.length);
			const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
			res.redirect(301, safepath + query);
			return;
		}
		next();
	});
	// Shows real origin IP when behind a reverse proxy (Nginx, Heroku, etc.)
	app.enable('trust proxy');
	// Sets appropriate HTTP headers for well-known web vulnerabilities
	app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
	// Enables cross-origin resource sharing
	app.use(cors());
	// Parses raw string of req.body into json
	app.use(express.json({ limit: '30mb' }));
	// Parses incoming requests with urlencoded payloads
	app.use(express.urlencoded({ limit: '30mb', extended: true }));
	// Compresses responses
	app.use(compression());
	// Reduce server fingerprinting
	app.disable('x-powered-by');
}
