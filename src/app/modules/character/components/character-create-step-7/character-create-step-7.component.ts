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
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { LanguagesFormBuilder } from '../../form-builders/languages-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [LanguagesFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-7',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-7.component.html',
	styleUrl: './character-create-step-7.component.scss',
})
export class CharacterCreateStep7Component implements OnInit {
	@Input() languages?: string[];
	@Output() nextStep: EventEmitter<string[]> = new EventEmitter();

	languagesFormBuilder = inject(LanguagesFormBuilder);
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

	public get languagesArray(): FormArray {
		return this.stepForm.get('languages') as FormArray;
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_7) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_7,
		);
	}

	public addLanguage(): void {
		// this.languagesArray.controls.push(new FormControl(''));
		const languagesArray = this.stepForm.get('languages') as FormArray;
		languagesArray.push(new FormControl(''));
	}

	public removeLanguage(index: number): void {
		this.languagesArray.controls.splice(index, 1);
	}

	public onContinue(): void {
		console.log(this.stepForm.value.languages);

		this.nextStep.emit(this.stepForm.value.languages as string[]);
		// this.characterCreationStepsSignalHandler.setStepOpened(
		// 	config.sections.stepCompleted,
		// 	CharacterCreationSteps.STEP_7,
		// );
		// this.characterCreationStepsSignalHandler.setStepOpened(
		// 	config.sections.steps,
		// 	CharacterCreationSteps.STEP_8,
		// );
	}

	private createForm() {
		this.stepForm = this.languagesFormBuilder.run(this.languages);
		if (!this.languages?.length) {
			const languagesArray = this.stepForm.get('languages') as FormArray;
			languagesArray.push(new FormControl(''));
		}
		this.stepForm.get('languages')?.valueChanges.subscribe((value) => {
			console.dir(value);
		});
	}
}
