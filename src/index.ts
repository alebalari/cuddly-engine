import app from './app';
import morgan from 'morgan';

const port = process.env.PORT != null || 3001;

app.use(morgan('dev'));

app.listen(port, () => {
	console.log(`Example app is listening on port ${port}`);
});
