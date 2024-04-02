import { Injectable, WritableSignal } from '@angular/core';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CharacterFinderSignalHandler extends SignalHandler<CharacterRequestDTO> {
	public getCharacter(section: string): WritableSignal<CharacterRequestDTO> {
		this.checkSection(section);

		return this.getDataSignal(section);
	}

	public setCharacter(section: string, character: CharacterRequestDTO): void {
		this.checkSection(section);
		this.replaceDataSignal(section, character);
	}

	public setCharacterLoading(section: string): void {
		this.checkSection(section);
		this.setLoadingSignal(section, true);
	}

	public setCharacterLoaded(section: string): void {
		this.checkSection(section);
		this.setLoadingSignal(section, false);
	}

	public getCharacterLoading(section: string): WritableSignal<boolean> {
		this.checkSection(section);

		return this.getLoadingSignal(section);
	}

	public cleanCharacterSection(section: string): void {
		this.cleanSection(section);
	}
}
