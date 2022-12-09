import cors from 'cors';
import express, { Application } from 'express';
import helmet from 'helmet';
import morganMiddleware from '../utils/morgan.utils';
import compression from 'compression';
import Logger from '../utils/logger.utils';

async function initializeExpress(app: Application): Promise<Application> {
	Logger.info('✌ Express server initialized');
	// Applies to all requests
	app.use((req, res, next) => {
		// Helpful HTTP header:
		res.set('Strict-Transport-Security', `max-age=${60 * 60 * 24 * 365 * 100}`);

		// /clean-urls/ -> /clean-urls
		if (req.path.endsWith('/') && req.path.length > 1) {
			const query = req.url.slice(req.path.length);
			const safepath = req.path.slice(0, -1).replace(/\/+/g, '/');
			res.redirect(301, safepath + query);
			return;
		}
		next();
	});

	// Middleware
	app.enable('trust proxy');
	app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));
	app.use(cors());
	app.use(express.json({ limit: '30mb' }));
	app.use(express.urlencoded({ limit: '30mb', extended: true }));
	app.use(compression());
	app.disable('x-powered-by');
	app.use(morganMiddleware);

	// Routes

	// Error Handling

	return app;
}

export default initializeExpress;
