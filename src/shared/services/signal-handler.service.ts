import { signal, WritableSignal } from '@angular/core';
import { IHeaders } from '@interfaces/core/base.interface';

export interface ISignals<T> {
	[key: string]: WritableSignal<T>;
}

export class SignalHandler<T> {
	protected dataSignals: ISignals<T> = {};
	protected loadingSignals: ISignals<boolean> = {};
	protected headersSignals: ISignals<IHeaders> = {};

	protected checkSection(section: string): void {
		if (this.dataSignals[section]) {
			return;
		}
		this.dataSignals[section] = signal(undefined as T);
		this.loadingSignals[section] = signal(false);
		this.headersSignals[section] = signal({} as IHeaders);
	}

	protected cleanSection(section: string): void {
		this.checkSection(section);

		this.dataSignals[section].set({} as T);
		this.loadingSignals[section].set(false);
		this.headersSignals[section] = signal({} as IHeaders);
	}

	protected getDataSignal(section: string): WritableSignal<T> {
		this.checkSection(section);

		return this.dataSignals[section];
	}

	protected getHeadersSignal(section: string): WritableSignal<IHeaders> {
		this.checkSection(section);

		return this.headersSignals[section];
	}

	protected getLoadingSignal(section: string): WritableSignal<boolean> {
		this.checkSection(section);

		return this.loadingSignals[section];
	}

	protected setLoadingSignal(section: string, loading: boolean): void {
		this.checkSection(section);
		this.loadingSignals[section].set(loading);
	}

	protected setHeadersSignal(section: string, headers: IHeaders): void {
		this.checkSection(section);

		this.headersSignals[section].set(headers);
	}

	protected concatDataSignal(section: string, data: T): void {
		this.checkSection(section);
		if (Array.isArray(data)) {
			(this.dataSignals[section] as WritableSignal<T[]>).update((value) => value.concat(data));
		}
	}

	protected pushDataSignal(section: string, data: T): void {
		this.checkSection(section);
		if (this.isWritableSignal(this.dataSignals[section])) {
			(this.dataSignals[section] as WritableSignal<T[]>).update((value) => [...value, data]);
		}
	}

	protected unshiftDataSignal(section: string, data: T): void {
		this.checkSection(section);
		if (this.isWritableSignal(this.dataSignals[section])) {
			(this.dataSignals[section] as WritableSignal<T[]>).update((value) => [data, ...value]);
		}
	}

	protected replaceDataSignal(section: string, data: T): void {
		this.checkSection(section);
		this.dataSignals[section].set(data);
	}

	private isWritableSignal<T>(object: unknown): object is WritableSignal<T[]> {
		return (
			typeof object === 'object' &&
			object !== null &&
			'update' in object &&
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			typeof (object as any).update === 'function'
		);
	}
}
