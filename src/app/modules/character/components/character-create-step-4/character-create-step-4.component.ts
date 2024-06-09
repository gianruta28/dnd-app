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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Attributes, SavingThrows, Skills } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { SkillStat } from '@interfaces/character/skill-stats.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { CapitalizePipe } from '@shared/pipes/capitalize.pipe';

import { CharacterConfig } from '../../character.config';
import { SkillsFormBuilder } from '../../form-builders/skills-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	ReactiveFormsModule,
	CapitalizePipe,
	TranslateModule,
];

const providers = [SkillsFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-4',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-4.component.html',
	styleUrl: './character-create-step-4.component.scss',
})
export class CharacterCreateStep4Component implements OnInit, OnChanges {
	@Input() savingThrows: SavingThrows | undefined;
	@Input() characterStats: Attributes | undefined;
	@Input() proficiencyBonus: number | undefined;
	@Input() characterSkills?: Skills;
	@Output() nextStep: EventEmitter<Skills> = new EventEmitter();

	skillsFormBuilder = inject(SkillsFormBuilder);

	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	public skills: string[];
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

	ngOnChanges(changes: SimpleChanges): void {
		// if (!changes.characterStats && !changes.proficiencyBonus) {
		// 	return;
		// }

		if (changes.characterStats && !changes.characterStats.firstChange) {
			this.characterStats = changes.characterStats.currentValue;
		}
		if (changes.proficiencyBonus && !changes.proficiencyBonus.firstChange) {
			this.proficiencyBonus = changes.proficiencyBonus.currentValue;
		}

		if (this.characterStats && this.proficiencyBonus) {
			this.stepForm = this.skillsFormBuilder.run(
				this.characterStats,
				this.characterSkills,
				this.proficiencyBonus ?? 0,
			);
		}
	}

	ngOnInit(): void {

		this.createForm();

		this.skills = Object.keys(SkillStat);
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_4) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_4,
		);
	}

	public isProficient(key: string): boolean {
		return this.stepForm.get(key)?.get('proficient')?.value as boolean;
	}

	public setProficient(key: string): void {
		const proficiencyControl = this.stepForm.get(key)?.get('proficient');
		const valueControl = this.stepForm.get(key)?.get('bonus');
		proficiencyControl?.patchValue(!proficiencyControl.value);

		if (proficiencyControl?.value) {
			valueControl?.patchValue(Number(valueControl.value) + Number(this.proficiencyBonus));

			return;
		}
		if (!proficiencyControl?.value) {
			valueControl?.patchValue(Number(valueControl.value) - Number(this.proficiencyBonus));

			return;
		}
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepForm.value as Skills);
		if (!this.characterSkills) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.stepCompleted,
				CharacterCreationSteps.STEP_4,
			);
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_5,
		);
	}

	private createForm() {

		this.stepForm = this.skillsFormBuilder.run(
			this.characterStats,
			this.characterSkills,
			this.proficiencyBonus,
		);
	}
}
