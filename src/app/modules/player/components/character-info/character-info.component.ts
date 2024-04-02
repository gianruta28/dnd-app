import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';
import { AttributeModifierPipe } from '@shared/pipes/attributeModifier.pipe';

const imports = [
	TranslateModule,
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	AttributeModifierPipe,
	RouterLink,
];

const providers = [];

@Component({
	selector: 'app-character-info',
	standalone: true,
	imports,
	templateUrl: './character-info.component.html',
	styleUrl: './character-info.component.scss',
})
export class CharacterInfoComponent implements OnInit {
	@Input() character: CharacterRequestDTO;
	ngOnInit(): void {}
}
