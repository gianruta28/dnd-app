import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';

@Injectable()
export class BaseInfoFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(character?: CharacterRequestDTO): FormGroup {
		return this.formBuilder.group({
			name: [character?.name ?? '', [Validators.required]],
			race: [character?.race ?? '', [Validators.required]],
			class: [character?.class ?? '', [Validators.required]],
			background: [character?.background ?? '', [Validators.required]],
			alignment: [character?.alignment ?? '', [Validators.required]],
			experiencePoints: [character?.experiencePoints ?? '', [Validators.required]],
			level: [character?.level ?? '', [Validators.required]],
		});
	}
}
