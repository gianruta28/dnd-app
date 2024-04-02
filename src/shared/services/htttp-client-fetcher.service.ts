import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpClientOptions } from '@interfaces/core/http-client.interface';
import { filter, map, Observable } from 'rxjs';

@Injectable()
export class HttpClientFetcher<ResponseDTO, RequestDTO> {
	constructor(private readonly http: HttpClient) {}

	protected findAll(
		endpoint: string,
		options: HttpClientOptions = {},
	): Observable<HttpResponse<ResponseDTO>> {
		return this.http.get<ResponseDTO>(endpoint, { ...options, observe: 'response' }).pipe(
			filter((event) => event instanceof HttpResponse),
			map((event) => event),
		);
	}

	protected findOne(
		endpoint: string,
		options: HttpClientOptions = {},
	): Observable<HttpResponse<ResponseDTO>> {
		return this.http.get<ResponseDTO>(endpoint, { ...options, observe: 'response' }).pipe(
			filter((event) => event instanceof HttpResponse),
			map((event) => event),
		);
	}

	protected create(
		data: RequestDTO,
		endpoint: string = '',
		options: HttpClientOptions = {},
	): Observable<HttpResponse<ResponseDTO>> {
		return this.http.post<ResponseDTO>(endpoint, data, { ...options, observe: 'events' }).pipe(
			filter((event) => event instanceof HttpResponse),
			map((event) => event as HttpResponse<ResponseDTO>),
		);
	}

	protected update(
		endpoint: string = '',
		data: RequestDTO,
		options: HttpClientOptions = {},
	): Observable<HttpResponse<ResponseDTO>> {
		return this.http.put<ResponseDTO>(endpoint, data, { ...options, observe: 'response' }).pipe(
			filter((event) => event instanceof HttpResponse),
			map((event) => event),
		);
	}

	protected delete(
		endpoint: string = '',
		options: HttpClientOptions = {},
	): Observable<HttpResponse<ResponseDTO>> {
		return this.http.delete<ResponseDTO>(endpoint, { ...options, observe: 'response' }).pipe(
			filter((event) => event instanceof HttpResponse),
			map((event) => event),
		);
	}
}
