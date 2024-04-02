import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Token } from '@interfaces/core/token.interface';
import { AuthUserRequest } from '@interfaces/user/user.interface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientFetcher } from 'src/shared/services/htttp-client-fetcher.service';

const { api } = environment;

@Injectable()
export class UserAuthenticatorFetcher extends HttpClientFetcher<Token, AuthUserRequest> {
	public run(data: AuthUserRequest): Observable<HttpResponse<Token>> {
		const url = `${api}/login`;

		return this.create(data, url, {});
	}
}
