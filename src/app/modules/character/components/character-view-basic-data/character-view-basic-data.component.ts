import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {
	CharacterRequestDTO,
	DeathSaves,
	HitPoints,
} from '@interfaces/character/character.interface';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { CharacterFinder } from '../../services/character-finder.service';
import { CharacterViewHpComponent } from '../character-view-hp/character-view-hp.component';

const imports = [CommonModule, LoadingComponent, NavigationComponent, ReactiveFormsModule];

const providers = [Location, CharacterFinderFetcher, CharacterFinder];

const config = CharacterConfig.actions.create;

export interface HpChange {
	newHp: HitPoints;
	deathSaves: DeathSaves;
}
@Component({
	selector: 'app-character-view-basic-data',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-view-basic-data.component.html',
	styleUrl: './character-view-basic-data.component.scss',
})
export class CharacterViewBasicDataComponent implements OnInit, OnDestroy {
	@Input() character: CharacterRequestDTO;
	@Output() onHpChanged: EventEmitter<HpChange> = new EventEmitter();
	constructor(public dialog: MatDialog) {}

	ngOnInit(): void {
		// this.openDialog();
	}

	ngOnDestroy(): void {}

	openDialog(): void {

		const dialogRef = this.dialog.open(CharacterViewHpComponent, {
			data: { characterHp: this.character.hitPoints, deathSaves: this.character.deathSaves },
			disableClose: true,
			height: '900',
		});

		dialogRef.afterClosed().subscribe(({ newHp, deathSaves, hpChanged }) => {
			if (!hpChanged) {
				return;
			}
			this.character.deathSaves = deathSaves;
			this.onHpChanged.emit({
				newHp,
				deathSaves,
			});
			//TODO update character with hp
		});
	}
}
