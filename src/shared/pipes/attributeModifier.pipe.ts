import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'attributeModifier',
	standalone: true,
})
export class AttributeModifierPipe implements PipeTransform {
	transform(value: number): string {
		if (value !== 0 && !value) {
			return '';
		}

		if (value > 0) {
			return `(+${value})`;
		}

		return `(${value})`;
	}
}
