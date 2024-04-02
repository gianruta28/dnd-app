import { Injectable, WritableSignal } from '@angular/core';
import { User } from '@interfaces/user/user.interface';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class UserSignalHandler extends SignalHandler<User> {
	public getUser(section: string): WritableSignal<User> {
		return this.getDataSignal(section);
	}

	public setUser(section: string, user: User): void {
		this.replaceDataSignal(section, user);
	}

	public userLoading(section: string): void {
		this.setLoadingSignal(section, true);
	}

	public userLoaded(section: string): void {
		this.setLoadingSignal(section, false);
	}

	public getUserLoading(section: string): WritableSignal<boolean> {
		return this.getLoadingSignal(section);
	}

	public cleanUserSection(section: string): void {
		this.cleanSection(section);
	}
}
