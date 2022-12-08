import { Application } from 'express';
import expressLoader from './express';

export default async ({ loadersInit }: { loadersInit: Application }) => {
	await expressLoader({ app: loadersInit });
	console.log('Express loaded ✌');
};
