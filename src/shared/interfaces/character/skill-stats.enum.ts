export interface SkillStatInterface {
	[key: string]: string;
	investigation: string;
	acrobatics: string;
	animal: string;
	arcana: string;
	athletics: string;
	deception: string;
	history: string;
	insight: string;
	intimidation: string;
	medicine: string;
	nature: string;
	perception: string;
	performance: string;
	persuasion: string;
	religion: string;
	sleightOfHand: string;
	stealth: string;
	survival: string;
}
export const SkillStat: SkillStatInterface = {
	acrobatics: 'dexterity',
	athletics: 'strength',
	arcana: 'intelligence',
	deception: 'charisma',
	history: 'intelligence',
	performance: 'charisma',
	intimidation: 'charisma',
	investigation: 'intelligence',
	sleightOfHand: 'dexterity',
	medicine: 'wisdom',
	nature: 'intelligence',
	perception: 'wisdom',
	insight: 'wisdom',
	persuasion: 'charisma',
	religion: 'intelligence',
	stealth: 'dexterity',
	survival: 'wisdom',
	animal: 'wisdom',
};
