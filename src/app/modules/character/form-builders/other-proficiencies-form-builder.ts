import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Proficiency } from '@interfaces/character/character.interface';

@Injectable()
export class OtherProficienciesFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(proficiencies?: Proficiency[]): FormGroup {
		return this.formBuilder.group({
			proficiencies: this.buildProficienciesArray(proficiencies),
		});
	}

	public buildProficiencyGroup(proficiency?: Proficiency): FormGroup {
		return this.formBuilder.group({
			name: [proficiency?.name ?? '', [Validators.required]],
			items: this.buildItemsArray(proficiency?.items),
		});
	}

	private buildProficienciesArray(proficiencies?: Proficiency[]) {
		if (!proficiencies?.length) {
			return this.formBuilder.array([]);
		}
		const proficienciesArrayForm = this.formBuilder.array([]) as FormArray;
		proficiencies.forEach((proficiency) => {
			proficienciesArrayForm.push(this.buildProficiencyGroup(proficiency));
		});

		return proficienciesArrayForm;
	}

	private buildItemsArray(proficiencyItems?: string[]) {
		if (!proficiencyItems?.length) {
			return this.formBuilder.array([]);
		}
		const proficiencieItemsArrayForm = this.formBuilder.array([]) as FormArray;
		proficiencyItems.forEach((proficiencyItem) => {
			const proficiencyItemFormControl = new FormControl(proficiencyItem ?? '');
			proficiencieItemsArrayForm.push(proficiencyItemFormControl);
		});

		return proficiencieItemsArrayForm;
	}
}
