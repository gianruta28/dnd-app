import { HttpClientOptions } from '@interfaces/core/http-client.interface';
import { environment } from 'src/environments/environment';

const { apiKey } = environment;

export class ApiHttpConfig {
	static createWithApiKey(): HttpClientOptions {
		return {
			headers: {
				Authorization: `ApiKey ${apiKey}`,
				'Access-Control-Allow-Origin': '*',
			},
		};
	}

	static createWithBearer(token: string): HttpClientOptions {
		return {
			headers: { Authorization: `Bearer ${token}` },
		};
	}
}
