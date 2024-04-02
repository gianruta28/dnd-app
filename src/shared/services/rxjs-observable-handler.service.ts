import { BehaviorSubject, Observable } from 'rxjs';
import {
	IBehaviorSubjects,
	IDataStore,
	IHeaders,
	IObservable,
} from 'src/shared/interfaces/core/base.interface';

export const STANDARD_SECTION = 'standard';

export abstract class RxjsObservableHandler<T> {
	protected bSubjects: IBehaviorSubjects<T> = {};
	protected observables: IObservable<T> = {};

	protected dataStore: IDataStore<T[]> = {};

	protected dataStoreHeaders: IDataStore<IHeaders> = {};

	protected behaviorSubjects: IBehaviorSubjects<T[]> = {};

	protected behaviorSubjectsHeaders: IBehaviorSubjects<IHeaders> = {};

	protected behaviorSubjectsUpdating: IBehaviorSubjects<boolean> = {};

	protected observable: IObservable<T[]> = {};

	protected observableHeaders: IObservable<IHeaders> = {};

	protected observableUpdating: IObservable<boolean> = {};

	constructor() {
		this.checkSection();
	}

	protected checkSection(section: string = STANDARD_SECTION, force: boolean = false): void {
		if (force || !this.dataStore[section]) {
			this.dataStore[section] = [] as T[];
			this.dataStoreHeaders[section] = {} as IHeaders;

			this.behaviorSubjects[section] = new BehaviorSubject(this.dataStore[section]);
			this.behaviorSubjectsHeaders[section] = new BehaviorSubject(this.dataStoreHeaders[section]);
			this.behaviorSubjectsUpdating[section] = new BehaviorSubject(false);

			this.observable[section] = this.behaviorSubjects[section].asObservable();
			this.observableHeaders[section] = this.behaviorSubjectsHeaders[section].asObservable();
			this.observableUpdating[section] = this.behaviorSubjectsUpdating[section].asObservable();
		}
	}

	protected cleanSection(section: string = STANDARD_SECTION): void {
		this.checkSection(section);
		this.dataStore[section] = [] as T[];
		this.dataStoreHeaders[section] = {} as IHeaders;
		this.next(section);
	}

	protected getObservable(section: string = STANDARD_SECTION): Observable<T[]> {
		this.checkSection(section);

		return this.observable[section];
	}

	protected changeUpdatingStatus(section: string = '', param: boolean = false): void {
		if (section) {
			this.checkSection(section);
			this.behaviorSubjectsUpdating[section].next(param);
		} else {
			Object.keys(this.dataStore).forEach((subSection) => {
				this.changeUpdatingStatus(subSection, param);
			});
		}
	}

	protected getObservableUpdating(section = 'standard'): Observable<boolean> {
		this.checkSection(section);

		return this.observableUpdating[section];
	}

	protected addResponseToSectionEnd(section: string = 'standard', data: T): void {
		this.dataStore[section].push(data);
		this.next(section);
	}

	protected addResponseToSectionBeginning(section: string = 'standard', data: T): void {
		this.dataStore[section].unshift(data);
		this.next(section);
	}

	protected replaceSectionWithData(section: string = 'standard', data: T): void {
		this.dataStore[section] = data as T[];
		this.next(section);
	}

	protected concatSectionWithData(section: string = 'standard', data: T): void {
		this.dataStore[section] = this.dataStore[section].concat(data);
		this.next(section);
	}

	protected next(section: string): void {
		this.behaviorSubjects[section].next(Object.assign({}, this.dataStore)[section]);

		this.behaviorSubjectsHeaders[section].next(Object.assign({}, this.dataStoreHeaders)[section]);
	}
}
