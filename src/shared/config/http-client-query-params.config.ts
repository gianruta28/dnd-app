import { HttpParams } from '@angular/common/http';

export class HttpClientQueryParamsConfig {
	static create(params: any) {
		let httpParams = new HttpParams();

		Object.keys(params).map((value) => {
			httpParams = httpParams.set(value, params[value]);
		});

		return httpParams;
	}
}
