import { Injectable, WritableSignal } from '@angular/core';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class UserMessageSignalHandler extends SignalHandler<string> {
	public getMessage(section: string): WritableSignal<string> {
		return this.getDataSignal(section);
	}

	public setMessage(section: string, user: string): void {
		this.replaceDataSignal(section, user);
	}

	public messageLoading(section: string): void {
		this.setLoadingSignal(section, true);
	}

	public messageLoaded(section: string): void {
		this.setLoadingSignal(section, false);
	}

	public usersLoaded(section: string): void {
		this.setLoadingSignal(section, false);
	}

	public cleanMessageSection(section: string): void {
		this.cleanSection(section);
	}
}
