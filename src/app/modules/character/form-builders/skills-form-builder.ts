import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Attributes, Skill, Skills } from '@interfaces/character/character.interface';

@Injectable()
export class SkillsFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(attributes?: Attributes, skills?: Skills, proficiencyBonus?: number): FormGroup {
		return this.formBuilder.group({
			acrobatics: this.buildSkillGroup(
				attributes?.dexterity.modifier,
				skills?.acrobatics,
				proficiencyBonus,
			),
			animal: this.buildSkillGroup(attributes?.wisdom.modifier, skills?.animal, proficiencyBonus),
			arcana: this.buildSkillGroup(
				attributes?.intelligence?.modifier,
				skills?.arcana,
				proficiencyBonus,
			),
			athletics: this.buildSkillGroup(
				attributes?.strength?.modifier,
				skills?.athletics,
				proficiencyBonus,
			),
			deception: this.buildSkillGroup(
				attributes?.charisma?.modifier,
				skills?.deception,
				proficiencyBonus,
			),
			history: this.buildSkillGroup(
				attributes?.intelligence?.modifier,
				skills?.history,
				proficiencyBonus,
			),
			insight: this.buildSkillGroup(
				attributes?.wisdom?.modifier,
				skills?.insight,
				proficiencyBonus,
			),
			intimidation: this.buildSkillGroup(
				attributes?.charisma?.modifier,
				skills?.intimidation,
				proficiencyBonus,
			),
			investigation: this.buildSkillGroup(
				attributes?.intelligence?.modifier,
				skills?.investigation,
				proficiencyBonus,
			),
			medicine: this.buildSkillGroup(
				attributes?.wisdom?.modifier,
				skills?.medicine,
				proficiencyBonus,
			),
			nature: this.buildSkillGroup(
				attributes?.intelligence?.modifier,
				skills?.nature,
				proficiencyBonus,
			),
			perception: this.buildSkillGroup(
				attributes?.wisdom?.modifier,
				skills?.perception,
				proficiencyBonus,
			),
			performance: this.buildSkillGroup(
				attributes?.charisma?.modifier,
				skills?.performance,
				proficiencyBonus,
			),
			persuasion: this.buildSkillGroup(
				attributes?.charisma?.modifier,
				skills?.persuasion,
				proficiencyBonus,
			),
			religion: this.buildSkillGroup(
				attributes?.intelligence?.modifier,
				skills?.religion,
				proficiencyBonus,
			),
			sleightOfHand: this.buildSkillGroup(
				attributes?.dexterity?.modifier,
				skills?.sleightOfHand,
				proficiencyBonus,
			),
			stealth: this.buildSkillGroup(
				attributes?.dexterity?.modifier,
				skills?.stealth,
				proficiencyBonus,
			),
			survival: this.buildSkillGroup(
				attributes?.wisdom?.modifier,
				skills?.survival,
				proficiencyBonus,
			),
		});
	}

	private buildSkillGroup(value?: number, skill?: Skill, proficiencyBonus?: number) {
		const bonus = value ?? 0;
		const proficiencyValue = proficiencyBonus ?? 0;

		return this.formBuilder.group({
			bonus: [skill?.proficient ? bonus + proficiencyValue : bonus ?? 0, [Validators.required]],
			proficient: [skill?.proficient ?? false, [Validators.required]],
		});
	}
}
