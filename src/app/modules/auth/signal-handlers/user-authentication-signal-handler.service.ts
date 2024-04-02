import { Injectable, WritableSignal } from '@angular/core';
import { UserResponseDTO } from '@interfaces/user/user.interface';
import { SignalHandler } from '@services/signal-handler.service';

import { authConfig } from '../auth.config';

@Injectable({
	providedIn: 'root',
})
export class UserAuthenticationSignalHandler extends SignalHandler<UserResponseDTO> {
	private readonly userSection = authConfig.actions.authentication.sections.user;

	public getUserAuthenticated(): WritableSignal<UserResponseDTO> {
		return this.getDataSignal(this.userSection);
	}

	public getUserAuthenticatedId(): string {
		return this.getDataSignal(this.userSection)().id;
	}

	public getSignalLoading(): WritableSignal<boolean> {
		return this.getLoadingSignal(this.userSection);
	}

	public setUserAuthenticated(user: UserResponseDTO): void {
		this.replaceDataSignal(this.userSection, user);
	}

	public setAuthenticationLoading(): void {
		this.setLoadingSignal(this.userSection, true);
	}

	public setAuthenticationLoaded(): void {
		this.setLoadingSignal(this.userSection, false);
	}

	public cleanUser(): void {
		this.cleanSection(this.userSection);
	}
}
