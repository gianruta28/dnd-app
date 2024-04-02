import { Injectable } from '@angular/core';
import { UserResponseDTO } from '@interfaces/user/user.interface';

import { BaseGuard } from './baseGuard.guard';

@Injectable()
export class UserGuard extends BaseGuard {
	protected override check(user: UserResponseDTO, isLogged: boolean): boolean {
		if (isLogged) {
			return true;
		}

		this.router.navigate(['']);

		return false;
	}
}
