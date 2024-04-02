import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { EmptyInterface, ExtendedRecordset } from '@interfaces/core/model.interface';
import { HttpClientFetcher } from '@services/htttp-client-fetcher.service';
import { ApiHttpConfig } from '@shared/config/api-http.config';
import { Observable } from 'rxjs';

const { api } = environment;

@Injectable()
export class CharactersFinderFetcher extends HttpClientFetcher<
	ExtendedRecordset<CharacterRequestDTO[]>,
	EmptyInterface
> {
	public run(
		accesToken: string,
	): Observable<HttpResponse<ExtendedRecordset<CharacterRequestDTO[]>>> {
		const url = `${api}/characters`;
		const options = ApiHttpConfig.createWithBearer(accesToken);

		return this.findAll(url, options);
	}
}
