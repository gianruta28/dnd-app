export interface Attribute {
	base: number;
	modifier: number;
}
export interface Attributes {
	[key: string]: Attribute;
	wisdom: Attribute;
	strength: Attribute;
	dexterity: Attribute;
	charisma: Attribute;
	intelligence: Attribute;
	constitution: Attribute;
}
export interface StatsInfo {
	stats: Attributes;
	armorClass: number;
	initiative: number;
	speed: number;
}
export interface BaseInfo {
	name: string;
	alignment: string;
	class: string;
	background: string;
	race: string;
	experiencePoints: number;
	level: number;
}
export interface SavingThrow {
	value: number;
	proficient: boolean;
}
export interface SavingThrows {
	wisdom: SavingThrow;
	strength: SavingThrow;
	dexterity: SavingThrow;
	charisma: SavingThrow;
	intelligence: SavingThrow;
	constitution: SavingThrow;
}
export interface Profficiencies {
	proficiencyBonus: number;
	savingThrows: SavingThrows;
}

export interface Skill {
	bonus: number;
	proficient: boolean;
}

export interface Skills {
	investigation: Skill;
	acrobatics: Skill;
	animal: Skill;
	arcana: Skill;
	athletics: Skill;
	deception: Skill;
	history: Skill;
	insight: Skill;
	intimidation: Skill;
	medicine: Skill;
	nature: Skill;
	perception: Skill;
	performance: Skill;
	persuasion: Skill;
	religion: Skill;
	sleightOfHand: Skill;
	stealth: Skill;
	survival: Skill;
}

export interface HitDice {
	total: number;
	value: string;
}
export interface HitPoints {
	max: number;
	current: number;
	temporary: number;
}

export interface Trait {
	name: string;
	description: string;
}

export interface OtherInfo {
	flaws?: string;
	personalityTraits?: string;
	bonds?: string;
	ideals?: string;
}
export interface SpellSlots {
	level1: string;
	level2: string;
	level3: string;
	level4: string;
	level5: string;
	level6: string;
	level7: string;
	level8: string;
	level9: string;
}
export interface DeathSaves {
	success: number;
	failures: number;
}
export interface Proficiency {
	name: string;
	items: string[];
}
export interface CharacterRequestDTO {
	id?: string;
	name?: string;
	alignment?: string;
	class?: string;
	background?: string;
	race?: string;
	experiencePoints?: number;
	level?: number;
	attributes?: Attributes;
	armorClass?: number;
	initiative?: number;
	speed?: number;
	proficiencyBonus?: number;
	savingThrows?: SavingThrows;
	skills?: Skills;
	hitDice?: HitDice;
	hitPoints?: HitPoints;
	proficiencies?: Proficiency[];
	languages?: string[];
	traits?: Trait[];
	bonds?: string;
	personalityTraits?: string;
	flaws?: string;
	ideals?: string;
	spellSlots?: SpellSlots;
	inspiration?: number;
	deathSaves?: DeathSaves;
}
