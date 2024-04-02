import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	Attribute,
	Attributes,
	CharacterRequestDTO,
	SavingThrow,
	SavingThrows,
} from '@interfaces/character/character.interface';

@Injectable()
export class ProficiencyFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(statsInfo?: Attributes, character?: CharacterRequestDTO): FormGroup {
		return this.formBuilder.group({
			proficiencyBonus: [character?.proficiencyBonus ?? '', [Validators.required]],
			savingThrows: this.buildSavingThrowsGroup(statsInfo, character?.savingThrows),
		});
	}

	private buildSavingThrowsGroup(statsInfo?: Attributes, savingThrows?: SavingThrows) {
		return this.formBuilder.group({
			strength: this.buildThrowGroup(statsInfo?.strength, savingThrows?.strength),
			charisma: this.buildThrowGroup(statsInfo?.charisma, savingThrows?.charisma),
			wisdom: this.buildThrowGroup(statsInfo?.wisdom, savingThrows?.wisdom),
			constitution: this.buildThrowGroup(statsInfo?.constitution, savingThrows?.constitution),
			intelligence: this.buildThrowGroup(statsInfo?.intelligence, savingThrows?.intelligence),
			dexterity: this.buildThrowGroup(statsInfo?.dexterity, savingThrows?.dexterity),
		});
	}

	private buildThrowGroup(stat?: Attribute, savingThrow?: SavingThrow) {
		return this.formBuilder.group({
			value: [savingThrow?.value ?? stat?.modifier, [Validators.required]],
			proficient: [savingThrow?.proficient ?? false, [Validators.required]],
		});
	}
}
