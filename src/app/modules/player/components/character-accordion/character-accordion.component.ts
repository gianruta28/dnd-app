import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';

import { CharacterInfoComponent } from '../character-info/character-info.component';

const imports = [CommonModule, CharacterInfoComponent];

const providers = [];

@Component({
	selector: 'app-character-accordion',
	standalone: true,
	imports,
	templateUrl: './character-accordion.component.html',
	styleUrl: './character-accordion.component.scss',
})
export class CharacterAccordionComponent implements OnInit {
	@Input() character: CharacterRequestDTO;
	public expanded: boolean = false;
	ngOnInit(): void {}

	expand(): void {
		this.expanded = !this.expanded;
	}
}
