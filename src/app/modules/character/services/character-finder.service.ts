import { Injectable } from '@angular/core';
import { TokenSignalHandler } from '@app/modules/auth/signal-handlers/token-signal-handler.service';
import { ToastrService } from 'ngx-toastr';

import { CharacterConfig } from '../character.config';
import { CharacterFinderFetcher } from '../fetchers/character-finder-fetcher';
import { CharacterFinderSignalHandler } from '../signal-handler/character-finder-signal-handler';

const sections = CharacterConfig.actions.findOne.sections;

@Injectable()
export class CharacterFinder {
	constructor(
		private readonly characterFinderFetcher: CharacterFinderFetcher,
		private readonly tokenSignalHandler: TokenSignalHandler,
		private readonly characterFinderSignalHandler: CharacterFinderSignalHandler,
		private readonly toastr: ToastrService,
	) {}

	run(characterId: string): void {
		if (!characterId) {
			return;
		}
		const token = this.tokenSignalHandler.getCurrentAccessToken();
		this.characterFinderSignalHandler.setCharacterLoading(sections.findOne);
		const request$ = this.characterFinderFetcher.run(token, characterId);

		request$.subscribe({
			next: (value) => {
				this.characterFinderSignalHandler.setCharacterLoaded(sections.findOne);

				if (!value?.body) {
					return;
				}
				console.log(value.body);

				this.characterFinderSignalHandler.setCharacter(sections.findOne, value.body);
			},
			error: (error) => {
				this.toastr.error('Ha Ocurrido un Error');
			},
		});
	}
}
