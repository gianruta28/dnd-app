import { inject, Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SavingThrows, Skill, Skills } from '@interfaces/character/character.interface';

@Injectable()
export class SkillsFormBuilder {
	formBuilder = inject(FormBuilder);

	public run(savingThrows?: SavingThrows, skills?: Skills): FormGroup {
		return this.formBuilder.group({
			acrobatics: this.buildSkillGroup(savingThrows?.dexterity.value, skills?.acrobatics),
			animal: this.buildSkillGroup(savingThrows?.wisdom.value, skills?.animal),
			arcana: this.buildSkillGroup(savingThrows?.intelligence?.value, skills?.arcana),
			athletics: this.buildSkillGroup(savingThrows?.strength?.value, skills?.athletics),
			deception: this.buildSkillGroup(savingThrows?.charisma?.value, skills?.deception),
			history: this.buildSkillGroup(savingThrows?.intelligence?.value, skills?.history),
			insight: this.buildSkillGroup(savingThrows?.wisdom?.value, skills?.insight),
			intimidation: this.buildSkillGroup(savingThrows?.charisma?.value, skills?.intimidation),
			investigation: this.buildSkillGroup(savingThrows?.intelligence?.value, skills?.investigation),
			medicine: this.buildSkillGroup(savingThrows?.wisdom?.value, skills?.medicine),
			nature: this.buildSkillGroup(savingThrows?.intelligence?.value, skills?.nature),
			perception: this.buildSkillGroup(savingThrows?.wisdom?.value, skills?.perception),
			performance: this.buildSkillGroup(savingThrows?.charisma?.value, skills?.performance),
			persuasion: this.buildSkillGroup(savingThrows?.charisma?.value, skills?.persuasion),
			religion: this.buildSkillGroup(savingThrows?.intelligence?.value, skills?.religion),
			sleightOfHand: this.buildSkillGroup(savingThrows?.dexterity?.value, skills?.sleightOfHand),
			stealth: this.buildSkillGroup(savingThrows?.dexterity?.value, skills?.stealth),
			survival: this.buildSkillGroup(savingThrows?.wisdom?.value, skills?.survival),
		});
	}

	private buildSkillGroup(bonus?: number, skill?: Skill) {
		return this.formBuilder.group({
			bonus: [bonus ?? 0, [Validators.required]],
			proficient: [skill?.proficient ?? false, [Validators.required]],
		});
	}
}
