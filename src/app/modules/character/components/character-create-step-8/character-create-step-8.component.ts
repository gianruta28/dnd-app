import { CommonModule } from '@angular/common';
import {
	Component,
	computed,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	Signal,
	WritableSignal,
} from '@angular/core';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Trait } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { TraitsFormBuilder } from '../../form-builders/traits-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [TraitsFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-8',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-8.component.html',
	styleUrl: './character-create-step-8.component.scss',
})
export class CharacterCreateStep8Component implements OnInit {
	@Input() traits?: Trait[];
	@Output() nextStep: EventEmitter<Trait[]> = new EventEmitter();

	traitsFormBuilder = inject(TraitsFormBuilder);
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	public characterCreationStep = CharacterCreationSteps;
	public stepForm: FormGroup;
	public stepOpen: CharacterCreationSteps;
	public $stepOpened: WritableSignal<string> =
		this.characterCreationStepsSignalHandler.getStepOpened(config.sections.steps);

	public stepCompleted: Signal<number> = computed(() => {
		return config.stepsNumber[
			this.characterCreationStepsSignalHandler.getStepOpened(config.sections.stepCompleted)()
		];
	});

	ngOnInit(): void {
		this.createForm();
	}

	public get traitsArray(): FormArray {
		return this.stepForm.get('traits') as FormArray;
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_8) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_8,
		);
	}

	public addTrait(): void {
		const proficienciesArray = this.stepForm.get('traits') as FormArray;
		proficienciesArray.push(this.traitsFormBuilder.buildTraitGroup());
	}

	public removeTrait(index: number): void {
		const proficienciesArray = this.stepForm.get('traits') as FormArray;
		proficienciesArray.controls.splice(index, 1);
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepForm.value.traits as Trait[]);
		if (!this.traits?.length) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.stepCompleted,
				CharacterCreationSteps.STEP_8,
			);
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_9,
		);
	}

	private createForm() {
		this.stepForm = this.traitsFormBuilder.run(this.traits);
		if (!this.traits?.length) {
			const proficienciesArray = this.stepForm.get('traits') as FormArray;
			proficienciesArray.push(this.traitsFormBuilder.buildTraitGroup());
		}
	}
}
