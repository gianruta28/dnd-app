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
import { OtherInfo } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { OtherInfoFormBuilder } from '../../form-builders/other-info-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [OtherInfoFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-9',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-9.component.html',
	styleUrl: './character-create-step-9.component.scss',
})
export class CharacterCreateStep9Component implements OnInit {
	@Input() otherInfo?: OtherInfo;
	@Output() nextStep: EventEmitter<OtherInfo> = new EventEmitter();

	otherInfoFormBuilder = inject(OtherInfoFormBuilder);

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

	public onContinue(): void {
		this.nextStep.emit(this.stepForm.value as OtherInfo);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.stepCompleted,
			CharacterCreationSteps.STEP_9,
		);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_10,
		);
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_9) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_9,
		);
	}

	private createForm() {
		this.stepForm = this.otherInfoFormBuilder.run(this.otherInfo);
	}
}
