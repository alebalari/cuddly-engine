interface Configuration {
	appName?: string;
	appVersion?: string;
	listeningPort: number;
	mongoDbURL: string;
	mongoOptions?: {
		family?: number; // Use IPv4, skip trying IPv6, default action is IPv6 first then IPv4
	};
}

export default Configuration;
