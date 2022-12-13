import { Application, NextFunction, Request, Response } from 'express';

export default function errorHandling(app: Application) {
	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		res.status(500).json({ err });
	});
}
