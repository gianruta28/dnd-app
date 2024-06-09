import { CommonModule, Location } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, WritableSignal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
	BaseInfo,
	CharacterRequestDTO,
	OtherInfo,
	Profficiencies,
	Proficiency,
	Skills,
	SpellSlots,
	StatsInfo,
	Trait,
} from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { CharacterCreateStep1Component } from '../../components/character-create-step-1/character-create-step-1.component';
import { CharacterCreateStep2Component } from '../../components/character-create-step-2/character-create-step-2.component';
import { CharacterCreateStep3Component } from '../../components/character-create-step-3/character-create-step-3.component';
import { CharacterCreateStep4Component } from '../../components/character-create-step-4/character-create-step-4.component';
import { CharacterCreateStep5Component } from '../../components/character-create-step-5/character-create-step-5.component';
import { CharacterCreateStep6Component } from '../../components/character-create-step-6/character-create-step-6.component';
import { CharacterCreateStep7Component } from '../../components/character-create-step-7/character-create-step-7.component';
import { CharacterCreateStep8Component } from '../../components/character-create-step-8/character-create-step-8.component';
import { CharacterCreateStep9Component } from '../../components/character-create-step-9/character-create-step-9.component';
import { CharacterCreateStep10Component } from '../../components/character-create-step-10/character-create-step-10.component';
import { CharacterEditorFetcher } from '../../fetchers/character-editor-fetcher';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { HitPointsInfo } from '../../form-builders/hit-points-form-builder';
import { CharacterEditor } from '../../services/character-editor.service';
import { CharacterFinder } from '../../services/character-finder.service';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';
import { CharacterFinderSignalHandler } from '../../signal-handler/character-finder-signal-handler';

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	ReactiveFormsModule,
	CharacterCreateStep1Component,
	CharacterCreateStep2Component,
	CharacterCreateStep3Component,
	CharacterCreateStep4Component,
	CharacterCreateStep5Component,
	CharacterCreateStep6Component,
	CharacterCreateStep7Component,
	CharacterCreateStep8Component,
	CharacterCreateStep9Component,
	CharacterCreateStep10Component,
];

const providers = [
	Location,
	CharacterFinder,
	CharacterFinderFetcher,
	CharacterEditor,
	CharacterEditorFetcher,
];

const config = CharacterConfig.actions;
@Component({
	selector: 'app-character-creates',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-edit.component.html',
	styleUrl: './character-edit.component.scss',
})
export class CharacterEditComponent implements OnInit, OnDestroy {
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	characterFinder = inject(CharacterFinder);
	characterEditor = inject(CharacterEditor);
	characterSignalHandler = inject(CharacterFinderSignalHandler);
	activatedRoute = inject(ActivatedRoute);

	public characterId: string;
	public characterCreationStep = CharacterCreationSteps;
	public newCharacter: CharacterRequestDTO = {};

	$character: WritableSignal<CharacterRequestDTO> = this.characterSignalHandler.getCharacter(
		config.findOne.sections.findOne,
	);

	$characterLoading: WritableSignal<boolean> = this.characterSignalHandler.getCharacterLoading(
		config.findOne.sections.findOne,
	);

	location = inject(Location);

	ngOnInit(): void {
		this.getCharacterIdFromRoute();
		this.getCharacter();

		this.characterCreationStepsSignalHandler.setStepOpened(
			config.create.sections.stepCompleted,
			this.characterCreationStep.STEP_10,
		);
	}

	ngOnDestroy(): void {
		this.characterCreationStepsSignalHandler.cleanStepOpened(config.create.sections.stepCompleted);
		this.characterCreationStepsSignalHandler.cleanStepOpened(config.create.sections.steps);
	}

	public returnNavigation(): void {
		this.location.back();
	}

	public onStep1Completed(baseInfo: BaseInfo): void {
		this.$character.set({
			...this.$character(),
			...baseInfo,
		});
	}

	public onStep2Completed(statsInfo: StatsInfo): void {
		this.$character.set({
			...this.$character(),
			...statsInfo,
			attributes: statsInfo.stats,
		});
	}

	public onStep3Completed(proficienciesInfo: Profficiencies): void {
		this.$character.set({
			...this.$character(),
			...proficienciesInfo,
		});
	}

	public onStep4Completed(skills: Skills): void {
		this.$character.set({
			...this.$character(),
			skills,
		});
	}

	public onStep5Completed(hitPointsInfo: HitPointsInfo): void {
		this.$character.set({
			...this.$character(),
			...hitPointsInfo,
		});
	}

	public onStep6Completed(proficiencies: Proficiency[]): void {
		this.$character.set({
			...this.$character(),
			proficiencies,
		});
	}

	public onStep7Completed(languages: string[]): void {
		this.$character.set({
			...this.$character(),
			languages,
		});
	}

	public onStep8Completed(traits: Trait[]): void {
		this.$character.set({
			...this.$character(),
			traits,
		});
	}

	public onStep9Completed(otherTraits: OtherInfo): void {
		this.$character.set({
			...this.$character(),
			...otherTraits,
		});
	}

	public onStep10Completed(spellSlots: SpellSlots): void {
		this.$character.set({
			...this.$character(),
			spellSlots,
		});
	}

	public save(): void {
		this.characterEditor.run(this.$character(), '/player/characters');
	}

	private getCharacterIdFromRoute(): void {
		this.characterId = this.activatedRoute.snapshot.params?.id;
	}

	private getCharacter() {
		this.characterFinder.run(this.characterId);
	}
}
