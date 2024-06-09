import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { CharacterDisplayInfoPipe } from '@shared/pipes/characterDisplayInfo.pipe';

import { CharacterConfig } from '../../character.config';
import {
	CharacterViewBasicDataComponent,
	HpChange,
} from '../../components/character-view-basic-data/character-view-basic-data.component';
import { CharacterViewStatsDataComponent } from '../../components/character-view-stats-data/character-view-stats-data.component';
import { CharacterViewThrowsDataComponent } from '../../components/character-view-throws-data/character-view-throws-data.component';
import { CharacterEditorFetcher } from '../../fetchers/character-editor-fetcher';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { CharacterEditor } from '../../services/character-editor.service';
import { CharacterFinder } from '../../services/character-finder.service';
import { CharacterFinderSignalHandler } from '../../signal-handler/character-finder-signal-handler';

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	ReactiveFormsModule,
	CharacterViewBasicDataComponent,
	CharacterViewStatsDataComponent,
	CharacterViewThrowsDataComponent,
	CharacterDisplayInfoPipe,
	MatDialogModule,
];

const providers = [
	Location,
	CharacterFinderFetcher,
	CharacterFinder,
	CharacterEditor,
	CharacterEditorFetcher,
	CharacterFinderSignalHandler,
];

const config = CharacterConfig.actions.findOne;
@Component({
	selector: 'app-character-view',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-view.component.html',
	styleUrl: './character-view.component.scss',
})
export class CharacterViewComponent implements OnInit, OnDestroy {
	location = inject(Location);
	activatedRoute = inject(ActivatedRoute);
	characterFinder = inject(CharacterFinder);
	characterSignalHandler = inject(CharacterFinderSignalHandler);
	characterEditor = inject(CharacterEditor);
	$character: WritableSignal<CharacterRequestDTO> = this.characterSignalHandler.getCharacter(
		config.sections.findOne,
	);

	$characterLoading: WritableSignal<boolean> = this.characterSignalHandler.getCharacterLoading(
		config.sections.findOne,
	);

	public characterId: string;

	ngOnInit(): void {
		this.getCharacterIdFromRoute();
		this.getCharacter();
	}

	ngOnDestroy(): void {}

	public returnNavigation(): void {
		this.location.back();
	}

	public hpChanged(newHp: HpChange): void {
		this.$character.set({
			...this.$character(),
			hitPoints: newHp.newHp,
			deathSaves: newHp.deathSaves,
		});

		this.characterEditor.run(this.$character());
	}

	private getCharacter() {
		this.characterFinder.run(this.characterId);
	}

	private getCharacterIdFromRoute() {
		this.characterId = this.activatedRoute.snapshot.params?.id;
	}
}
