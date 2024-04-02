import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RefreshTokenRequest, Token } from '@interfaces/core/token.interface';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientFetcher } from 'src/shared/services/htttp-client-fetcher.service';

const { api } = environment;

@Injectable()
export class RefreshTokenFetcher extends HttpClientFetcher<Token, RefreshTokenRequest> {
	public async run(refreshToken: string): Promise<HttpResponse<Token>> {
		const url = `${api}/refresh-token`;

		return lastValueFrom(this.create({ refreshToken }, url, {}));
	}
}
