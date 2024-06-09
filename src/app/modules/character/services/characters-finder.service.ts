import { Injectable } from '@angular/core';
import { TokenSignalHandler } from '@app/modules/auth/signal-handlers/token-signal-handler.service';
import { ToastrService } from 'ngx-toastr';

import { CharacterConfig } from '../character.config';
import { CharactersFinderFetcher } from '../fetchers/characters-finder-fetcher';
import { CharactersFinderSignalHandler } from '../signal-handler/characters-finder-signal-handler';

const sections = CharacterConfig.actions.findAll.sections;

@Injectable()
export class CharactersFinder {
	constructor(
		private readonly charactersFinderFetcher: CharactersFinderFetcher,
		private readonly tokenSignalHandler: TokenSignalHandler,
		private readonly charactersFinderSignalHandler: CharactersFinderSignalHandler,
		private readonly toastr: ToastrService,
	) {}

	run(): void {
		const token = this.tokenSignalHandler.getCurrentAccessToken();
		this.charactersFinderSignalHandler.setCharactersLoading(sections.findAll);
		const request$ = this.charactersFinderFetcher.run(token);

		request$.subscribe({
			next: (value) => {
				this.charactersFinderSignalHandler.setCharactersLoaded(sections.findAll);

				if (!value?.body) {
					this.charactersFinderSignalHandler.setCharacters(sections.findAll, []);

					return;
				}

				this.charactersFinderSignalHandler.setCharacters(sections.findAll, value.body.data);
			},
			error: (error) => {
				this.toastr.error('Ha Ocurrido un Error');
			},
		});
	}
}
