import { CommonModule, Location } from '@angular/common';
import {
	Component,
	computed,
	inject,
	OnDestroy,
	OnInit,
	Signal,
	WritableSignal,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
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
import { CharacterCreatorFetcher } from '../../fetchers/character-creator-fetcher';
import { HitPointsInfo } from '../../form-builders/hit-points-form-builder';
import { OtherInfoFormBuilder } from '../../form-builders/other-info-form-builder';
import { CharacterCreator } from '../../services/character-creator.service';
import { CharacterCreationSignalHandler } from '../../signal-handler/character-creation-signal-handler';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

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

const providers = [Location, OtherInfoFormBuilder, CharacterCreatorFetcher, CharacterCreator];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-creates',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create.component.html',
	styleUrl: './character-create.component.scss',
})
export class CharacterCreateComponent implements OnInit, OnDestroy {
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	characterCreationSignalHandler = inject(CharacterCreationSignalHandler);
	characterCreator = inject(CharacterCreator);

	public characterCreationStep = CharacterCreationSteps;
	public newCharacter: CharacterRequestDTO = {
		attributes: {
			wisdom: {
				base: 12,
				modifier: 1,
			},
			strength: {
				base: 18,
				modifier: 4,
			},
			dexterity: {
				base: 14,
				modifier: 2,
			},
			charisma: {
				base: 16,
				modifier: 3,
			},
			intelligence: {
				base: 10,
				modifier: 0,
			},
			constitution: {
				base: 16,
				modifier: 3,
			},
		},
		savingThrows: {
			strength: {
				value: 6,
				proficient: true,
			},
			charisma: {
				value: 3,
				proficient: false,
			},
			wisdom: {
				value: 3,
				proficient: true,
			},
			constitution: {
				value: 3,
				proficient: false,
			},
			intelligence: {
				value: 2,
				proficient: true,
			},
			dexterity: {
				value: 2,
				proficient: false,
			},
		},
	};

	public stepOpen: CharacterCreationSteps;
	location = inject(Location);

	public $stepOpened: WritableSignal<string> =
		this.characterCreationStepsSignalHandler.getStepOpened(config.sections.steps);

	public $characterCreationLoading: WritableSignal<boolean> =
		this.characterCreationSignalHandler.getCharacterLoading(config.sections.creation);

	public stepCompleted: Signal<number> = computed(() => {
		return config.stepsNumber[
			this.characterCreationStepsSignalHandler.getStepOpened(config.sections.stepCompleted)()
		];
	});

	ngOnInit(): void {
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.stepCompleted,
			CharacterCreationSteps.STEP_6,
		);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_7,
		);
	}

	ngOnDestroy(): void {
		this.characterCreationStepsSignalHandler.cleanStepOpened(config.sections.stepCompleted);
		this.characterCreationStepsSignalHandler.cleanStepOpened(config.sections.steps);
	}

	public returnNavigation(): void {
		this.location.back();
	}

	public onStep1Completed(baseInfo: BaseInfo): void {
		this.newCharacter = {
			...this.newCharacter,
			...baseInfo,
			inspiration: 3,
		};
	}

	public onStep2Completed(statsInfo: StatsInfo): void {
		this.newCharacter = {
			...this.newCharacter,
			...statsInfo,
			attributes: statsInfo.stats,
		};
	}

	public onStep3Completed(proficienciesInfo: Profficiencies): void {
		this.newCharacter = {
			...this.newCharacter,
			...proficienciesInfo,
		};
	}

	public onStep4Completed(skills: Skills): void {
		this.newCharacter = {
			...this.newCharacter,
			skills,
		};
	}

	public onStep5Completed(hitPointsInfo: HitPointsInfo): void {
		this.newCharacter = {
			...this.newCharacter,
			...hitPointsInfo,
		};
	}

	public onStep6Completed(proficiencies: Proficiency[]): void {
		this.newCharacter = {
			...this.newCharacter,
			proficiencies,
		};
	}

	public onStep7Completed(languages: string[]): void {
		this.newCharacter = {
			...this.newCharacter,
			languages,
		};
	}

	public onStep8Completed(traits: Trait[]): void {
		this.newCharacter = {
			...this.newCharacter,
			traits,
		};
	}

	public onStep9Completed(otherTraits: OtherInfo): void {
		this.newCharacter = {
			...this.newCharacter,
			...otherTraits,
		};
	}

	public onStep10Completed(spellSlots: SpellSlots): void {
		this.newCharacter = {
			...this.newCharacter,
			spellSlots,
		};
		this.characterCreator.run(this.newCharacter);
	}
}
