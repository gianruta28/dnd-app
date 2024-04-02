import { Injectable } from '@angular/core';

import { StorageHandlerInterface } from './interfaces/storage-handler.interface';

@Injectable({
	providedIn: 'root',
})
export class LocalStorageHandler<K> implements StorageHandlerInterface<K> {
	read(key: string): K {
		const localStorageData = localStorage.getItem(key);

		return JSON.parse(`${localStorageData}`) as K;
	}

	insert(key: string, data: K): void {
		try {
			localStorage.setItem(key, JSON.stringify(data));
		} catch (error) {
			console.error(error);
		}
	}

	remove(key: string): void {
		localStorage.removeItem(key);
	}

	clear(): void {
		localStorage.clear();
	}
}
