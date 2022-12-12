export default interface HttpException extends Error {
	status: number;
	message: string;
}
