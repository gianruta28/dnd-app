import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { EmptyInterface } from '@interfaces/core/model.interface';
import { HttpClientFetcher } from '@services/htttp-client-fetcher.service';
import { ApiHttpConfig } from '@shared/config/api-http.config';
import { Observable } from 'rxjs';

const { api } = environment;

@Injectable()
export class CharacterFinderFetcher extends HttpClientFetcher<CharacterRequestDTO, EmptyInterface> {
	public run(
		accesToken: string,
		characterId: string,
	): Observable<HttpResponse<CharacterRequestDTO>> {
		const url = `${api}/characters/${characterId}`;
		const options = ApiHttpConfig.createWithBearer(accesToken);

		return this.findOne(url, options);
	}
}
