import { CommonModule } from '@angular/common';
import {
	Component,
	computed,
	EventEmitter,
	inject,
	Input,
	OnChanges,
	OnInit,
	Output,
	Signal,
	SimpleChanges,
	WritableSignal,
} from '@angular/core';
import { AbstractControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	Attributes,
	CharacterRequestDTO,
	Profficiencies,
} from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { ProficiencyFormBuilder } from '../../form-builders/proficiency-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [ProficiencyFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-3',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-3.component.html',
	styleUrl: './character-create-step-3.component.scss',
})
export class CharacterCreateStep3Component implements OnInit, OnChanges {
	@Input() character: CharacterRequestDTO;
	@Input() statsInfo?: Attributes;
	@Output() nextStep: EventEmitter<Profficiencies> = new EventEmitter();

	proficiencyFormBuilder = inject(ProficiencyFormBuilder);
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	public characterCreationStep = CharacterCreationSteps;
	public stepThreeForm: FormGroup;
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
		this.listenToFormChanges();
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (changes.statsInfo?.firstChange) {
			return;
		}
		this.updateAllSavingThrows();
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_3) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_3,
		);
	}

	public setProficient(stat: string): void {
		const statProficiencyControl = this.stepThreeForm.controls.savingThrows.get(stat);
		if (!statProficiencyControl || !this.stepThreeForm.controls.proficiencyBonus.value) {
			return;
		}

		statProficiencyControl
			?.get('proficient')
			?.patchValue(!statProficiencyControl?.get('proficient')?.value);

		this.updateSavingThrow(
			statProficiencyControl,
			!!statProficiencyControl?.get('proficient')?.value,
		);
	}

	public isProficient(stat: string): boolean {
		const statProficiencyControl = this.stepThreeForm.controls.savingThrows
			.get(stat)
			?.get('proficient');

		return statProficiencyControl?.value as boolean;
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepThreeForm.value as Profficiencies);
		if (!this.character) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.stepCompleted,
				CharacterCreationSteps.STEP_3,
			);
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_4,
		);
	}

	private updateSavingThrow(control: AbstractControl, shouldAdd?: boolean) {
		const bonusToAdd = shouldAdd
			? this.stepThreeForm.controls.proficiencyBonus.value
			: -this.stepThreeForm.controls.proficiencyBonus.value;
		const valueControl = control.get('value');
		valueControl?.patchValue(valueControl?.value + bonusToAdd);
	}

	private createForm() {
		this.stepThreeForm = this.proficiencyFormBuilder.run(this.statsInfo, this.character);
	}

	private listenToFormChanges() {
		this.stepThreeForm
			.get('proficiencyBonus')
			?.valueChanges.pipe()
			.subscribe((value) => {
				this.updateAllSavingThrows();
			});
	}

	private updateAllSavingThrows() {
		const proficiencyBonus = this.stepThreeForm.get('proficiencyBonus')?.value;
		const statProficiencyControl = this.stepThreeForm.controls.savingThrows;
		Object.keys(statProficiencyControl.value).forEach((key: string) => {
			const savingThrowControl = statProficiencyControl.get(key);
			if (!savingThrowControl) {
				return;
			}
			if (this.character?.attributes) {
				this.updateThrowsWithCharacterInfo(
					this.character.attributes,
					savingThrowControl,
					proficiencyBonus,
					key,
				);
			}
			if (this.statsInfo !== undefined) {
				this.updateThrowsWithStatsInfo(this.statsInfo, savingThrowControl, proficiencyBonus, key);
			}
		});
	}

	private updateThrowsWithStatsInfo(
		statsInfo: Attributes,
		savingThrowControl: AbstractControl,
		proficiencyBonus: number,
		throwKey: string,
	) {
		savingThrowControl
			?.get('value')
			?.patchValue(
				savingThrowControl?.get('proficient')?.value
					? statsInfo[throwKey].modifier + proficiencyBonus
					: statsInfo[throwKey].modifier,
			);
	}

	private updateThrowsWithCharacterInfo(
		statsInfo: Attributes,
		savingThrowControl: AbstractControl,
		proficiencyBonus: number,
		throwKey: string,
	) {
		savingThrowControl
			?.get('value')
			?.patchValue(
				savingThrowControl?.get('proficient')?.value
					? statsInfo[throwKey].modifier + proficiencyBonus
					: statsInfo[throwKey].modifier,
			);
	}
}
