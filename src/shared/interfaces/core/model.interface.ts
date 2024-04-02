export interface ModelInterface {
	id: string;
}

export interface ExtendedRecordset<T> {
	data: T;
	totalCount: number;
	count: number;
	page: number;
}

export interface EmptyInterface {}
