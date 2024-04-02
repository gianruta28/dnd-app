import { BehaviorSubject, Observable } from 'rxjs';

export interface IHeaders {
	limit: number;
	page: number;
	count: number;
}

export interface IDataStore<T> {
	[key: string]: T;
}

export interface ModelInterface {
	id?: string;
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IBehaviorSubjects<T> {
	[key: string]: BehaviorSubject<T>;
}

export interface IObservable<T> {
	[key: string]: Observable<T>;
}
