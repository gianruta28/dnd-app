import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { TokenSignalHandler } from '@app/modules/auth/signal-handlers/token-signal-handler.service';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { ToastrService } from 'ngx-toastr';

import { CharacterConfig } from '../character.config';
import { CharacterCreatorFetcher } from '../fetchers/character-creator-fetcher';
import { CharacterCreationSignalHandler } from '../signal-handler/character-creation-signal-handler';

const sections = CharacterConfig.actions.create.sections;

@Injectable()
export class CharacterCreator {
	constructor(
		private readonly characterCreatorFetcher: CharacterCreatorFetcher,
		private readonly tokenSignalHandler: TokenSignalHandler,
		private readonly characterCreationSignalHandler: CharacterCreationSignalHandler,
		private readonly router: Router,
		private readonly toastr: ToastrService,
	) {}

	run(characterData: CharacterRequestDTO): void {
		const token = this.tokenSignalHandler.getCurrentAccessToken();
		this.characterCreationSignalHandler.setCharacterLoading(sections.creation);
		const request$ = this.characterCreatorFetcher.run(token, characterData);

		request$.subscribe({
			next: (value) => {
				this.characterCreationSignalHandler.setCharacterLoaded(sections.creation);

				if (!value?.body) {
					return;
				}
				this.characterCreationSignalHandler.setCharacter(sections.creation, value.body);
				this.toastr.success('Personaje Creado con Éxito');
				this.router.navigate(['/player/characters']);
			},
			error: (error) => {
				this.toastr.error('Ha Ocurrido un Error, compruebe los campos e intente denuevo');
				this.characterCreationSignalHandler.setCharacterLoaded(sections.creation);
			},
		});
	}
}
