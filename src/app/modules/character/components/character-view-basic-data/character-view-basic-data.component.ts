import { CommonModule, Location } from '@angular/common';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { CharacterFinder } from '../../services/character-finder.service';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [Location, CharacterFinderFetcher, CharacterFinder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-view-basic-data',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-view-basic-data.component.html',
	styleUrl: './character-view-basic-data.component.scss',
})
export class CharacterViewBasicDataComponent implements OnInit, OnDestroy {
	@Input() character: CharacterRequestDTO;
	ngOnInit(): void {}

	ngOnDestroy(): void {}
}
