import express, { Request, Response } from 'express';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));

app.get('/', (req: Request, res: Response) => {
	res.send('Hello World');
});

app.get('/healthcheck', (req: Request, res: Response) => {
	res.send('Everything Looks Good!');
});

export default app;
