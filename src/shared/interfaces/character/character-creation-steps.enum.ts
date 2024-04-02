export enum CharacterCreationSteps {
	STEP_1 = 'baseInfo',
	STEP_2 = 'statsInfo',
	STEP_3 = 'proficiencyInfo',
	STEP_4 = 'skillsInfo',
	STEP_5 = 'hpInfo',
	STEP_6 = 'otherProficiencies',
	STEP_7 = 'languages',
	STEP_8 = 'traitsInfo',
	STEP_9 = 'otherInfo',
	STEP_10 = 'spellsSlots',
	NO_STEP = 'noStep',
}
export interface StepsNumber {
	[key: string]: number;
	baseInfo: number;
	statsInfo: number;
	proficiencyInfo: number;
	skillsInfo: number;
	hpInfo: number;
	otherProficiencies: number;
	languages: number;
	traitsInfo: number;
	otherInfo: number;
}
