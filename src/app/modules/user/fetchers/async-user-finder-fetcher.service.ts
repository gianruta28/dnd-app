import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmptyInterface } from '@interfaces/core/model.interface';
import { UserResponseDTO } from '@interfaces/user/user.interface';
import { lastValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ApiHttpConfig } from '../../../../shared/config/api-http.config';
import { HttpClientFetcher } from '../../../../shared/services/htttp-client-fetcher.service';

const { api } = environment;

@Injectable()
export class AsyncUserFinderFetcher extends HttpClientFetcher<UserResponseDTO, EmptyInterface> {
	public async run(accessToken: string): Promise<HttpResponse<UserResponseDTO>> {
		const options = ApiHttpConfig.createWithBearer(accessToken);
		const url = `${api}/user`;

		return lastValueFrom(this.findOne(url, options));
	}
}
