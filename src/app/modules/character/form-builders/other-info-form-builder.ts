import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OtherInfo } from '@interfaces/character/character.interface';

@Injectable()
export class OtherInfoFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(otherInfo?: OtherInfo): FormGroup {
		return this.formBuilder.group({
			bonds: [otherInfo?.bonds ?? '', [Validators.required]],
			flaws: [otherInfo?.flaws ?? '', [Validators.required]],
			personalityTraits: [otherInfo?.personalityTraits ?? '', [Validators.required]],
			ideals: [otherInfo?.ideals ?? '', [Validators.required]],
		});
	}
}
