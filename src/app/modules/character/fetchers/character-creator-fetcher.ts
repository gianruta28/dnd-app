import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { HttpClientFetcher } from '@services/htttp-client-fetcher.service';
import { ApiHttpConfig } from '@shared/config/api-http.config';
import { Observable } from 'rxjs';

const { api } = environment;

@Injectable()
export class CharacterCreatorFetcher extends HttpClientFetcher<
	CharacterRequestDTO,
	CharacterRequestDTO
> {
	public run(
		accesToken: string,
		character: CharacterRequestDTO,
	): Observable<HttpResponse<CharacterRequestDTO>> {
		const url = `${api}/characters`;
		const options = ApiHttpConfig.createWithBearer(accesToken);

		return this.create(character, url, options);
	}
}
