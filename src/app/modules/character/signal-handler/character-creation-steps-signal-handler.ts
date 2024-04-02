import { Injectable, WritableSignal } from '@angular/core';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CharacterCreationStepsSignalHandler extends SignalHandler<string> {
	public setStepOpened(section: string, step: string): void {
		this.checkSection(section);
		this.replaceDataSignal(section, step);
	}

	public getStepOpened(section: string): WritableSignal<string> {
		this.checkSection(section);

		return this.getDataSignal(section);
	}

	public cleanStepOpened(section: string): void {
		this.cleanSection(section);
	}
}
