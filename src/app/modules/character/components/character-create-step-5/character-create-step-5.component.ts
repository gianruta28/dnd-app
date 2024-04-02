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
import { HitDice, HitPoints } from '@interfaces/character/character.interface';
import { CharacterCreationSteps } from '@interfaces/character/character-creation-steps.enum';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { debounceTime } from 'rxjs';

import { CharacterConfig } from '../../character.config';
import { HitPointsFormBuilder, HitPointsInfo } from '../../form-builders/hit-points-form-builder';
import { CharacterCreationStepsSignalHandler } from '../../signal-handler/character-creation-steps-signal-handler';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [HitPointsFormBuilder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-create-step-5',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-create-step-5.component.html',
	styleUrl: './character-create-step-5.component.scss',
})
export class CharacterCreateStep5Component implements OnInit, OnChanges {
	@Input() constitutionBonus?: number = 0;
	@Input() hitDice?: HitDice;
	@Input() hitPoints?: HitPoints;
	@Output() nextStep: EventEmitter<HitPointsInfo> = new EventEmitter();
	hitPointsFormBuilder = inject(HitPointsFormBuilder);
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

	ngOnChanges(changes: SimpleChanges): void {
		console.log(changes);

		if (!changes?.constitutionBonus || changes.constitutionBonus.isFirstChange()) {
			return;
		}
		const hitDiceControl = this.stepForm.get('hitDice');
		if (!hitDiceControl) {
			return;
		}
		this.updateHitPoints(hitDiceControl, this.hitDice?.value);
	}

	ngOnInit(): void {
		this.createForm();
		this.listenForm();
	}

	public toggle(): void {
		if (this.$stepOpened() === CharacterCreationSteps.STEP_5) {
			this.characterCreationStepsSignalHandler.setStepOpened(
				config.sections.steps,
				CharacterCreationSteps.NO_STEP,
			);

			return;
		}
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_5,
		);
	}

	public onContinue(): void {
		this.nextStep.emit(this.stepForm.value as HitPointsInfo);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.stepCompleted,
			CharacterCreationSteps.STEP_5,
		);
		this.characterCreationStepsSignalHandler.setStepOpened(
			config.sections.steps,
			CharacterCreationSteps.STEP_6,
		);
	}

	private createForm() {
		this.stepForm = this.hitPointsFormBuilder.run(this.hitDice, this.hitPoints);
	}

	private listenForm() {
		const hitDiceControl = this.stepForm.get('hitDice');
		hitDiceControl
			?.get('value')
			?.valueChanges.pipe(debounceTime(500))
			.subscribe((value: string) => {
				if (!hitDiceControl?.get('value')?.valid) {
					return;
				}
				this.updateHitPoints(hitDiceControl, value);
			});
	}

	private updateHitPoints(hitDiceControl: AbstractControl, value?: string) {
		if (!value) {
			return;
		}
		const [totalHitDices, diceValue] = value.split('d');

		const hitDicePointsControl = this.stepForm.get('hitPoints');
		const hptToAssign = this.getMaxHitPoints(Number(totalHitDices), Number(diceValue));
		hitDicePointsControl?.patchValue({
			max: hptToAssign,
			current: hptToAssign,
			temporary: hptToAssign,
		});
		hitDiceControl?.get('total')?.patchValue(Number(totalHitDices));
	}

	private getMaxHitPoints(totalHitDices: number, diceValue: number) {
		console.log(this.constitutionBonus);

		return totalHitDices * diceValue + (this.constitutionBonus ?? 0);
	}
}
