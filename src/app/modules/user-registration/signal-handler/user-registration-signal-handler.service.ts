import { Injectable, WritableSignal } from '@angular/core';
import { UserResponseDTO } from '@interfaces/user/user.interface';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class UserRegistratorSignalHandler extends SignalHandler<UserResponseDTO> {
	public getUserRegistration(section: string): WritableSignal<UserResponseDTO> {
		return this.getDataSignal(section);
	}

	public setUserRegistered(section: string, user: UserResponseDTO): void {
		this.replaceDataSignal(section, user);
	}

	public userRegistrationLoading(section: string): void {
		this.setLoadingSignal(section, true);
	}

	public userRegistrationLoaded(section: string): void {
		this.setLoadingSignal(section, false);
	}

	public getUserRegistrationLoading(section: string): WritableSignal<boolean> {
		return this.getLoadingSignal(section);
	}

	public cleanUserSection(section: string): void {
		this.cleanSection(section);
	}
}
