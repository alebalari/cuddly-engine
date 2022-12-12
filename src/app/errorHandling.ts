import { Application, NextFunction, Request, Response } from 'express';
import HttpException from '../utils/interfaces/httpException.interface';

export default async function errorHandling(app: Application): Promise<void> {
	app.use((err: HttpException, req: Request, res: Response, next: NextFunction) => {
		const status = err.status ?? 500;
		const message = err.message ?? '⚠️  Uh-oh something went wrong';
		res.status(status).json({ status, message });
	});
}
