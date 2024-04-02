import { IQueryParams } from '@interfaces/core/query-params.interface';

export class BasicQueryParamsConfig {
	static create(params: IQueryParams): string {
		if (!Object.keys(params).length) {
			return '';
		}
		const queryParams = new URLSearchParams();
		Object.keys(params).forEach((key) => {
			if (params[key] !== undefined && params[key] !== '') {
				queryParams.append(key, String(params[key]));
			}
		});

		return queryParams.toString();
	}
}
