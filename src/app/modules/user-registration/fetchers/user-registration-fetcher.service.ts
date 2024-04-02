import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRequestDTO, UserResponseDTO } from '@interfaces/user/user.interface';
import { ApiHttpConfig } from '@shared/config/api-http.config';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClientFetcher } from 'src/shared/services/htttp-client-fetcher.service';

const { api } = environment;

@Injectable()
export class UserRegistratorFetcher extends HttpClientFetcher<UserResponseDTO, UserRequestDTO> {
	public run(data: UserRequestDTO): Observable<HttpResponse<UserResponseDTO>> {
		const options = ApiHttpConfig.createWithApiKey();

		const url = `${api}/users/create`;

		return this.create(data, url, options);
	}
}
