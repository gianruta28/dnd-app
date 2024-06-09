import { CommonModule, Location } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { DeathSaves } from '@interfaces/character/character.interface';
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular/standalone';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { CharacterFinder } from '../../services/character-finder.service';

const imports = [
	CommonModule,
	LoadingComponent,
	NavigationComponent,
	ReactiveFormsModule,
	MatDialogTitle,
	MatDialogContent,
	IonPicker,
	IonPickerColumn,
	IonPickerColumnOption,
	ReactiveFormsModule,
];

const providers = [Location, CharacterFinderFetcher, CharacterFinder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-death-saves',
	standalone: true,
	imports,
	providers,
	templateUrl: './death-saves.component.html',
	styleUrl: './death-saves.component.scss',
})
export class DeathSavesComponent implements OnInit, OnDestroy {
	@Output() stable: EventEmitter<boolean> = new EventEmitter();
	@Output() dead: EventEmitter<boolean> = new EventEmitter();
	@Input() deathSaves: DeathSaves;
	public maxCount: number = 3;
	constructor() {}

	ngOnInit(): void {}

	ngOnDestroy(): void {}

	public updateSuccessCount(index: number): void {

		if (index === this.deathSaves.success - 1) {
			this.deathSaves.success = index;

			return;
		}
		this.deathSaves.success = index + 1;
		this.checkStable();
	}

	public updateFailsCount(index: number): void {
		if (index === this.deathSaves.failures - 1) {
			this.deathSaves.failures = index;

			return;
		}
		this.deathSaves.failures = index + 1;
		this.checkDead();
	}

	public checkStable(): void {
		if (this.deathSaves.success !== 3) {
			return;
		}
		this.stable.emit(true);
		this.deathSaves = {
			success: 0,
			failures: 0,
		};
	}

	public checkDead(): void {
		if (this.deathSaves.failures !== 3) {
			return;
		}

		this.dead.emit(true);
		this.deathSaves = {
			success: 0,
			failures: 3,
		};
	}
}
