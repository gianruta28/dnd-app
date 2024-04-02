import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterConfig } from '@app/modules/character/character.config';
import { CharactersFinderFetcher } from '@app/modules/character/fetchers/characters-finder-fetcher';
import { CharactersFinder } from '@app/modules/character/services/characters-finder.service';
import { CharactersFinderSignalHandler } from '@app/modules/character/signal-handler/characters-finder-signal-handler';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterAccordionComponent } from '../../components/character-accordion/character-accordion.component';

const charactersSections = CharacterConfig.actions.findAll.sections;

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	CharacterAccordionComponent,
	RouterLink,
];

const providers = [CharactersFinderFetcher, CharactersFinder];

@Component({
	selector: 'app-player-characters',
	standalone: true,
	imports,
	providers,
	templateUrl: './player-characters.component.html',
	styleUrl: './player-characters.component.scss',
})
export class PlayerCharactersComponent implements OnInit {
	charactersFinder: CharactersFinder = inject(CharactersFinder);
	charactersSignalHandler: CharactersFinderSignalHandler = inject(CharactersFinderSignalHandler);
	public $characters: WritableSignal<CharacterRequestDTO[]> =
		this.charactersSignalHandler.getCharacters(charactersSections.findAll);

	public $charactersLoading: WritableSignal<boolean> =
		this.charactersSignalHandler.getCharactersLoading(charactersSections.findAll);

	ngOnInit(): void {
		this.charactersFinder.run();
	}
}
