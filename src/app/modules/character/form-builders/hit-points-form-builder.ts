import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HitDice, HitPoints } from '@interfaces/character/character.interface';

export interface HitPointsInfo {
	hitDice: HitDice;
	hitPoints: HitPoints;
}

@Injectable()
export class HitPointsFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(hitDice?: HitDice, hitPoints?: HitPoints): FormGroup {
		return this.formBuilder.group({
			hitDice: this.buildHitDiceGroup(hitDice),
			hitPoints: this.buildHitPointsGroup(hitPoints),
		});
	}

	private buildHitPointsGroup(hitPoints?: HitPoints) {
		return this.formBuilder.group({
			current: [hitPoints?.current ?? '', [Validators.required]],
			max: [hitPoints?.max ?? 0, [Validators.required]],
			temporary: [hitPoints?.temporary ?? 0, [Validators.required]],
		});
	}

	private buildHitDiceGroup(hitDice?: HitDice) {
		return this.formBuilder.group({
			value: [
				hitDice?.value ?? '',
				[Validators.required, Validators.pattern(/^[1-9]\d?d[1-9]\d?$/)],
			],
			total: [hitDice?.total ?? 0, [Validators.required]],
		});
	}
}
