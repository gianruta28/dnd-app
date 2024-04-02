import { StepsNumber } from '@interfaces/character/character-creation-steps.enum';

export const CharacterConfig = {
	actions: {
		create: {
			sections: {
				steps: 'characterCreationSteps',
				stepCompleted: 'characterStepCompleted',
				creation: 'characterCreate',
			},
			races: [
				{
					name: 'Dragonborn',
					value: 'dragonborn',
				},
				{
					name: 'Dwarf',
					value: 'dwarf',
				},
				{
					name: 'Eladrin',
					value: 'eladrin',
				},
				{
					name: 'Elf',
					value: 'elf',
				},
				{
					name: 'Gnome',
					value: 'gnome',
				},
				{
					name: 'Half-elf',
					value: 'half-elf',
				},
				{
					name: 'Half-orc',
					value: 'half-orc',
				},
				{
					name: 'Halfling',
					value: 'halfling',
				},
				{
					name: 'Human',
					value: 'human',
				},
				{
					name: 'Tiefling',
					value: 'tiefling',
				},
			],
			classes: [
				{
					name: 'Artificier',
					value: 'artificier',
				},
				{
					name: 'Bard',
					value: 'bard',
				},
				{
					name: 'Barbarian',
					value: 'barbarian',
				},
				{
					name: 'Blood Hunter',
					value: 'blood-hunter',
				},
				{
					name: 'Cleric',
					value: 'cleric',
				},
				{
					name: 'Druid',
					value: 'druid',
				},
				{
					name: 'Fighter',
					value: 'fighter',
				},
				{
					name: 'Monk',
					value: 'monk',
				},
				{
					name: 'Paladin',
					value: 'paladin',
				},
				{
					name: 'Ranger',
					value: 'ranger',
				},
				{
					name: 'Rouge',
					value: 'rouge',
				},
				{
					name: 'Sorcerer',
					value: 'sorcerer',
				},
				{
					name: 'Warlock',
					value: 'warlock',
				},
				{
					name: 'Wizard',
					value: 'wizard',
				},
			],
			backgrounds: [
				{
					name: 'Acolyte',
					value: 'acolyte',
				},
				{
					name: 'Charlatan',
					value: 'charlatan',
				},
				{
					name: 'Criminal',
					value: 'criminal',
				},
				{
					name: 'Entertainer',
					value: 'entertainer',
				},
				{
					name: 'Folk Hero',
					value: 'folk-hero',
				},
				{
					name: 'Guild Artisan',
					value: 'guild-artisan',
				},
				{
					name: 'Hermit',
					value: 'hermit',
				},
				{
					name: 'Noble',
					value: 'noble',
				},
				{
					name: 'Outlander',
					value: 'outlander',
				},
				{
					name: 'Sage',
					value: 'sage',
				},
				{
					name: 'Sailor',
					value: 'sailor',
				},
				{
					name: 'Soldier',
					value: 'soldier',
				},
				{
					name: 'Urchin',
					value: 'urchin',
				},
			],
			alignments: [
				{
					name: 'Lawful good',
					value: 'LG',
				},
				{
					name: 'Neutral good',
					value: 'NG',
				},
				{
					name: 'Chaotic good',
					value: 'CG',
				},
				{
					name: 'Lawful neutral',
					value: 'LN',
				},
				{
					name: 'Neutral',
					value: 'N',
				},
				{
					name: 'Chaotic neutral',
					value: 'CN',
				},
				{
					name: 'Lawful evil',
					value: 'LE',
				},
				{
					name: 'Neutral evil',
					value: 'NE',
				},
				{
					name: 'Chaotic evil',
					value: 'CE',
				},
			],
			stepsNumber: <StepsNumber>{
				baseInfo: 1,
				statsInfo: 2,
				proficiencyInfo: 3,
				skillsInfo: 4,
				hpInfo: 5,
				otherProficiencies: 6,
				languages: 7,
				traitsInfo: 8,
				otherInfo: 9,
				spellsSlots: 10,
			},
		},
		findAll: {
			sections: {
				findAll: 'findAll',
			},
		},
		findOne: {
			sections: {
				findOne: 'findOne',
			},
		},
	},
};
