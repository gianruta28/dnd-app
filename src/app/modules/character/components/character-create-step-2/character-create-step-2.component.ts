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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CharacterRequestDTO, StatsInfo } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { StatsInfoFormBuilder } from '../../form-builders/stats-info-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [StatsInfoFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-2',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-2.component.html',
	styleUrl: './character-create-step-2.component.scss',
})
export class CharacterCreateStep2Component implements OnInit {
	@Input() character: CharacterRequestDTO;
	@Output() nextStep: EventEmitter<StatsInfo> = new EventEmitter();

	statsInfoFormBuilder = inject(StatsInfoFormBuilder);
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	public stepsNumber = config.stepsNumber;
	public characterCreationStep = CharacterCreationSteps;
	public stepTwoForm: FormGroup;
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

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_2) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_2,
		);
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepTwoForm.value as StatsInfo);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_3,
		);
		if (!this.character) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.stepCompleted,
				CharacterCreationSteps.STEP_2,
			);
		}
	}

	private createForm() {
		this.stepTwoForm = this.statsInfoFormBuilder.run(this.character);
	}
}
