import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SpellSlots } from '@interfaces/character/character.interface';

@Injectable()
export class SpellSlotsFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(spellSlots?: SpellSlots): FormGroup {
		return this.formBuilder.group({
			level1: [spellSlots?.level1 ?? '', [Validators.required]],
			level2: [spellSlots?.level2 ?? '', [Validators.required]],
			level3: [spellSlots?.level3 ?? '', [Validators.required]],
			level4: [spellSlots?.level4 ?? '', [Validators.required]],
			level5: [spellSlots?.level5 ?? '', [Validators.required]],
			level6: [spellSlots?.level6 ?? '', [Validators.required]],
			level7: [spellSlots?.level7 ?? '', [Validators.required]],
			level8: [spellSlots?.level8 ?? '', [Validators.required]],
			level9: [spellSlots?.level9 ?? '', [Validators.required]],
		});
	}
}
