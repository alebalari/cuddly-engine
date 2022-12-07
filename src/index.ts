import app from './app';

const port = process.env.PORT != null || 3001;

app.listen(port, () => {
	console.log(`Example app is listening on port ${port}`);
});
