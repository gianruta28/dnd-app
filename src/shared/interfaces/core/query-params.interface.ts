export interface IQueryParams {
	[key: string]: any;
	sortColumn?: string;
	sortOrder?: string;
	take?: number;
	page?: number;
}
