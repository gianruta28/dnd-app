import { inject, Injectable } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Injectable()
export class LanguagesFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(languages?: string[]): FormGroup {
		return this.formBuilder.group({
			languages: this.buildLanguagesArray(languages),
		});
	}

	private buildLanguagesArray(languages?: string[]) {
		if (!languages?.length) {
			return this.formBuilder.array([]);
		}
		const languagesArrayForm = this.formBuilder.array([]) as FormArray;
		languages.forEach((language) => {
			const languageFormGroup = new FormControl(language);
			languagesArrayForm.push(languageFormGroup);
		});

		return languagesArrayForm;
	}
}
