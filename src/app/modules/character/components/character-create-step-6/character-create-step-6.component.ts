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
import { Proficiency } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { OtherProficienciesFormBuilder } from '../../form-builders/other-proficiencies-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [OtherProficienciesFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-6',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-6.component.html',
	styleUrl: './character-create-step-6.component.scss',
})
export class CharacterCreateStep6Component implements OnInit {
	@Input() otherProficiencies?: Proficiency[];
	@Output() nextStep: EventEmitter<Proficiency[]> = new EventEmitter();

	otherProficienciesFormBuilder = inject(OtherProficienciesFormBuilder);
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

	get proficienciesArray(): FormArray {
		return this.stepForm.get('proficiencies') as FormArray;
	}

	ngOnInit(): void {
		this.createForm();
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_6) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_6,
		);
	}

	public addProficiency(): void {
		const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;
		proficienciesArray.push(this.otherProficienciesFormBuilder.buildProficiencyGroup());
	}

	public removeProficiency(index: number): void {
		const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;
		proficienciesArray.controls.splice(index, 1);
	}

	public getCOntrolsOnIndex(index: number): FormArray {
		const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;

		return proficienciesArray.controls[index].get('items') as FormArray;
	}

	public addProficiencyItem(index: number): void {
		const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;
		const itemsArray = proficienciesArray.controls[index].get('items') as FormArray;
		itemsArray.push(new FormControl(''));
	}

	public removeProficiencyItem(proficiencyIndex: number, itemIndex: number): void {
		const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;
		const itemsArray = proficienciesArray.controls[proficiencyIndex].get('items') as FormArray;
		itemsArray.controls.splice(itemIndex, 1);
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepForm.value.proficiencies as Proficiency[]);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.stepCompleted,
			CharacterCreationSteps.STEP_6,
		);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_7,
		);
	}

	private createForm() {
		this.stepForm = this.otherProficienciesFormBuilder.run(this.otherProficiencies);
		if (!this.otherProficiencies?.length) {
			const proficienciesArray = this.stepForm.get('proficiencies') as FormArray;
			proficienciesArray.push(this.otherProficienciesFormBuilder.buildProficiencyGroup());
		}
	}
}
