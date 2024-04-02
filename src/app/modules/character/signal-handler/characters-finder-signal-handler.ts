import { Injectable, WritableSignal } from '@angular/core';
import { CharacterRequestDTO } from '@interfaces/character/character.interface';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class CharactersFinderSignalHandler extends SignalHandler<CharacterRequestDTO[]> {
	public getCharacters(section: string): WritableSignal<CharacterRequestDTO[]> {
		this.checkSection(section);

		return this.getDataSignal(section);
	}

	public setCharacters(section: string, character: CharacterRequestDTO[]): void {
		this.checkSection(section);
		this.replaceDataSignal(section, character);
	}

	public setCharactersLoading(section: string): void {
		this.checkSection(section);
		this.setLoadingSignal(section, true);
	}

	public setCharactersLoaded(section: string): void {
		this.checkSection(section);
		this.setLoadingSignal(section, false);
	}

	public getCharactersLoading(section: string): WritableSignal<boolean> {
		this.checkSection(section);

		return this.getLoadingSignal(section);
	}

	public cleanCharactersSection(section: string): void {
		this.cleanSection(section);
	}
}
