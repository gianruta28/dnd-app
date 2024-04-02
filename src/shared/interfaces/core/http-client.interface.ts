import { HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';

export interface HttpClientOptions {
	params?: HttpParams;
	headers?:
		| HttpHeaders
		| {
				[header: string]: string | string[];
		  }
		| undefined;
	observe?: string;
	context?: HttpContext;
}
