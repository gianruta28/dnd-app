import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Trait } from '@interfaces/character/character.interface';

@Injectable()
export class TraitsFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(traits?: Trait[]): FormGroup {
		return this.formBuilder.group({
			traits: this.buildTraitsArray(traits),
		});
	}

	public buildTraitGroup(trait?: Trait): FormGroup {
		return this.formBuilder.group({
			name: [trait?.name ?? '', [Validators.required]],
			description: [trait?.description ?? '', [Validators.required]],
		});
	}

	private buildTraitsArray(traits?: Trait[]) {
		if (!traits?.length) {
			return this.formBuilder.array([]);
		}
		const traitsArrayForm = this.formBuilder.array([]) as FormArray;
		traits.forEach((trait) => {
			const traitFormGroup = this.buildTraitGroup(trait);
			traitsArrayForm.push(traitFormGroup);
		});

		return traitsArrayForm;
	}
}
