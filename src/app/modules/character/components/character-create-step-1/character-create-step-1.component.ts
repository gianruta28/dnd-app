import { CommonModule } from '@angular/common';
import {
	Component,
	EventEmitter,
	inject,
	Input,
	OnInit,
	Output,
	WritableSignal,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BaseInfo, CharacterRequestDTO } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { BaseInfoFormBuilder } from '../../form-builders/base-info-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	ReactiveFormsModule,
	TranslateModule,
];

const providers = [BaseInfoFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-1',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-1.component.html',
	styleUrl: './character-create-step-1.component.scss',
})
export class CharacterCreateStep1Component implements OnInit {
	@Input() character: CharacterRequestDTO;
	@Output() nextStep: EventEmitter<BaseInfo> = new EventEmitter();
	baseInfoFormBuilder = inject(BaseInfoFormBuilder);
	characterCreationStepsSignalHandler = inject(CharacterCreationStepsSignalHandler);
	public characterCreationStep = CharacterCreationSteps;
	public stepOneForm: FormGroup;
	public stepOpen: CharacterCreationSteps;
	public racesOptions = config.races;
	public classesOptions = config.classes;
	public backgroundOptions = config.backgrounds;
	public alignmentsOptions = config.alignments;
	public $stepOpened: WritableSignal<string> =
		this.characterCreationStepsSignalHandler.getStepOpened(config.sections.steps);

	ngOnInit(): void {

		this.createForm();
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_1) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_1,
		);
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepOneForm.value as BaseInfo);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_2,
		);
		if (!this.character) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.stepCompleted,
				CharacterCreationSteps.STEP_1,
			);
		}
	}

	private createForm() {
		this.stepOneForm = this.baseInfoFormBuilder.run(this.character);
	}
}
