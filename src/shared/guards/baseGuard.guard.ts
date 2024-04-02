import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { UserAuthenticationSignalHandler } from '@app/modules/auth/signal-handlers/user-authentication-signal-handler.service';
import { UserResponseDTO } from '@interfaces/user/user.interface';

@Injectable()
export abstract class BaseGuard {
	protected router = inject(Router);
	protected userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);

	protected abstract check(user: UserResponseDTO, isLogged: boolean): boolean;

	protected canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.canActivateChild(route, state);
	}

	protected canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		return this.checkUserLogin(route, state);
	}

	protected checkUserLogin(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
		const userSignal = this.userAuthenticationSignalHandler.getUserAuthenticated();

		return this.check(userSignal(), !!userSignal()?.id);
	}
}
