import { Pipe, PipeTransform } from '@angular/core';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';

@Pipe({
	name: 'characterDisplayInfo',
	standalone: true,
})
export class CharacterDisplayInfoPipe implements PipeTransform {
	transform(character: CharacterRequestDTO): string {
		if (!character) {
			return '-';
		}

		return `${character.name} - Level ${character.level} (${character.experiencePoints} XP)`;
	}
}
