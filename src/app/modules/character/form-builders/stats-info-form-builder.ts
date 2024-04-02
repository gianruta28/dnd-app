import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
	Attribute,
	Attributes,
	CharacterRequestDTO,
} from '@interfaces/character/character.interface';

@Injectable()
export class StatsInfoFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(character?: CharacterRequestDTO): FormGroup {
		return this.formBuilder.group({
			stats: this.buildStatsGroup(character?.attributes),
			armorClass: [character?.armorClass ?? '', [Validators.required]],
			initiative: [character?.initiative ?? '', [Validators.required]],
			speed: [character?.speed ?? '', [Validators.required]],
		});
	}

	private buildStatsGroup(attributes?: Attributes) {
		return this.formBuilder.group({
			wisdom: this.buildStatGroup(attributes?.wisdom),
			strength: this.buildStatGroup(attributes?.strength),
			dexterity: this.buildStatGroup(attributes?.dexterity),
			charisma: this.buildStatGroup(attributes?.charisma),
			intelligence: this.buildStatGroup(attributes?.intelligence),
			constitution: this.buildStatGroup(attributes?.constitution),
		});
	}

	private buildStatGroup(attribute?: Attribute) {
		return this.formBuilder.group({
			base: [attribute?.base ?? '', [Validators.required]],
			modifier: [attribute?.modifier ?? '', [Validators.required]],
		});
	}
}
