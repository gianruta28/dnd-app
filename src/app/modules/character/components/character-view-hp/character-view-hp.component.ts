import { CommonModule, Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
	MAT_DIALOG_DATA,
	MatDialogContent,
	MatDialogRef,
	MatDialogTitle,
} from '@angular/material/dialog';
import { DeathSaves, HitPoints } from '@interfaces/character/character.interface';
import { IonPicker, IonPickerColumn, IonPickerColumnOption } from '@ionic/angular/standalone';
import { LoadingComponent } from '@shared/components/loading/loading.component';
import { NavigationComponent } from '@shared/components/navigation/navigation.component';

import { CharacterConfig } from '../../character.config';
import { CharacterFinderFetcher } from '../../fetchers/character-finder-fetcher';
import { CharacterFinder } from '../../services/character-finder.service';
import { DeathSavesComponent } from '../death-saves/death-saves.component';

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
	DeathSavesComponent,
];

const providers = [Location, CharacterFinderFetcher, CharacterFinder];

const config = CharacterConfig.actions.create;
@Component({
	selector: 'app-character-hp-data',
	standalone: true,
	imports,
	providers,
	templateUrl: './character-view-hp.component.html',
	styleUrl: './character-view-hp.component.scss',
})
export class CharacterViewHpComponent implements OnInit, OnDestroy {
	public characterHp: HitPoints;
	public deathSaves: DeathSaves;
	public hpsLength: number = 100;
	public hpControl: FormControl = new FormControl('1');
	public advancedForm: FormGroup;
	public hpChanged: boolean;
	constructor(
		@Inject(MAT_DIALOG_DATA)
		public data: { characterHp: HitPoints; deathSaves: DeathSaves },
		private readonly dialogRef: MatDialogRef<CharacterViewHpComponent>,
		private readonly formBuilder: FormBuilder,
	) {}

	ngOnInit(): void {
		this.setHp();
		this.setDeathSaves();
		this.buildForm();
		this.listenForm();
	}

	ngOnDestroy(): void {}

	onIonChange(event: CustomEvent): void {
		this.hpControl.patchValue(event.detail.value);
	}

	public restoreHp(): void {
		const hpWasZero = this.characterHp.current === 0;
		this.hpChanged = true;
		if (this.characterHp.current + Number(this.hpControl.value) >= this.characterHp.max) {
			this.characterHp.current = this.characterHp.max;

			if (hpWasZero) {
				this.deathSaves = {
					success: 0,
					failures: 0,
				};
			}

			return;
		}
		this.characterHp.current += Number(this.hpControl.value);
		if (hpWasZero) {
			this.deathSaves = {
				success: 0,
				failures: 0,
			};
		}
	}

	public reduceHp(): void {
		this.hpChanged = true;
		const damage = Number(this.hpControl.value);

		if (this.characterHp.temporary > 0) {
			const residualDamage = this.characterHp.temporary - damage;
			this.characterHp.temporary -= damage;

			if (residualDamage < 0) {
				this.characterHp.current += residualDamage;
			}

			this.characterHp.temporary = this.characterHp.temporary > 0 ? this.characterHp.temporary : 0;
			this.characterHp.current = this.characterHp.current > 0 ? this.characterHp.current : 0;

			if (this.characterHp.current === 0) {
				this.deathSaves = {
					success: 0,
					failures: 0,
				};
			}

			return;
		}

		this.characterHp.current -= damage;
		this.characterHp.current = this.characterHp.current > 0 ? this.characterHp.current : 0;
		if (this.characterHp.current === 0) {
			this.deathSaves = {
				success: 0,
				failures: 0,
			};
		}
	}

	public closeModal(): void {
		this.dialogRef.close({
			newHp: this.characterHp,
			deathSaves: this.deathSaves,
			hpChanged: this.hpChanged,
		});
	}

	public characterStabilized(): void {
		this.characterHp.current = 1;
		this.deathSaves = {
			success: 0,
			failures: 0,
		};
	}

	public characterDied(): void {
		this.characterHp.current = 0;
		this.deathSaves = {
			success: 0,
			failures: 3,
		};
	}

	private buildForm() {
		this.advancedForm = this.formBuilder.group({
			tempHp: [this.characterHp.temporary ?? 0],
			newMaxHp: [0],
		});
	}

	private listenForm() {

		this.advancedForm.get('tempHp')?.valueChanges.subscribe((tempHp) => {
			this.characterHp.temporary = tempHp;
			this.hpChanged = true;
		});
		this.advancedForm.get('newMaxHp')?.valueChanges.subscribe((newMaxHp) => {

			this.characterHp.max = newMaxHp;
			this.hpChanged = true;
		});
	}

	private setHp() {
		this.characterHp = this.data.characterHp;
	}

	private setDeathSaves() {
		this.deathSaves = this.data.deathSaves;
	}
}
