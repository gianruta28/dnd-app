import { Injectable, WritableSignal } from '@angular/core';
import { ResponseError } from '@interfaces/core/error.interface';
import { SignalHandler } from '@services/signal-handler.service';

@Injectable({
	providedIn: 'root',
})
export class UserErrorSignalHandler extends SignalHandler<ResponseError> {
	public updateErrorSection(section: string, error: ResponseError): void {
		this.checkSection(section);
		this.replaceDataSignal(section, error);
	}

	public getErrorSignal(section: string): WritableSignal<ResponseError> {
		this.checkSection(section);

		return this.getDataSignal(section);
	}

	public cleanErrorSection(section: string): void {
		this.cleanSection(section);
	}
}
