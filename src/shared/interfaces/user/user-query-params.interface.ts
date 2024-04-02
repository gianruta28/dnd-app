import { IQueryParams } from '@interfaces/core/query-params.interface';

export interface UserQueryParams extends IQueryParams {
	name?: string;
	email?: string;
	keyword?: string;
}
