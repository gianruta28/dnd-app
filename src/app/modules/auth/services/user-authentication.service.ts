import { HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncUserFinderFetcher } from '@app/modules/user/fetchers/async-user-finder-fetcher.service';
import { Token, TokenProcessed } from '@interfaces/core/token.interface';
import { AuthUserRequest, UserResponseDTO } from '@interfaces/user/user.interface';
import { UserRoles } from '@interfaces/user/user-roles.enum';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageHandler } from 'src/shared/services/local-storage-handler.service';

import { authConfig } from '../auth.config';
import { UserAuthenticatorFetcher } from '../fetchers/user-authentication-fetcher.service';
import { TokenSignalHandler } from '../signal-handlers/token-signal-handler.service';
import { UserAuthenticationSignalHandler } from '../signal-handlers/user-authentication-signal-handler.service';
import { UserAuthenticatorTokenHandler } from '../signal-handlers/user-authentication-token-handler.service';
import { TokenRefresher } from './token-refresher.service';

const localStorageSections = authConfig.actions.localStorage.sections;

@Injectable()
export class UserAuthenticator {
	private readonly userAuthenticatorTokenHanlder = inject(UserAuthenticatorTokenHandler);
	private readonly tokenRefresher = inject(TokenRefresher);
	private readonly asyncUserFinderFetcher = inject(AsyncUserFinderFetcher);
	private readonly userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);

	private readonly router = inject(Router);
	private readonly userAuthenticatorFetcher = inject(UserAuthenticatorFetcher);
	constructor(
		private readonly localStorageUserHandler: LocalStorageHandler<UserResponseDTO>,
		private readonly localStorageTokenHandler: LocalStorageHandler<TokenProcessed>,
		private readonly tokenSignalHandler: TokenSignalHandler,
		private readonly toastr: ToastrService,
	) {}

	public login(data: AuthUserRequest): void {
		const users$ = this.userAuthenticatorFetcher.run(data);
		this.userAuthenticationSignalHandler.setAuthenticationLoading();
		users$.subscribe({
			next: async (response: HttpResponse<Token>) => {
				if (!response.body) {
					return;
				}
				await this.loginSuccess(response.body);
				this.userAuthenticationSignalHandler.setAuthenticationLoaded();
			},
			error: (error: any) => {
				this.userAuthenticationSignalHandler.setAuthenticationLoaded();
				this.toastr.error('Error al hacer log in');
			},
		});
	}

	public logout(): void {
		this.localStorageUserHandler.clear();
		this.localStorageTokenHandler.clear();

		this.userAuthenticationSignalHandler.cleanUser();
		this.tokenSignalHandler.cleanTokens();
		this.router.navigate(['/auth/login']);
	}

	private async loginSuccess(responseToken: Token) {
		const { tokens, tokenDecoded } = this.userAuthenticatorTokenHanlder.run(responseToken);

		this.handleTokens(tokens);

		if (!tokenDecoded.email) {
			return;
		}
		const userResponse = await this.asyncUserFinderFetcher.run(tokens.token);
		if (!userResponse.body) {
			return;
		}
		this.localStorageUserHandler.insert(localStorageSections.user, userResponse.body);
		this.userAuthenticationSignalHandler.setUserAuthenticated(userResponse.body);

		this.tokenRefresher.listenTokenRefresh(tokens);
		this.redirectUser(userResponse.body);
	}

	private handleTokens(tokens: TokenProcessed) {
		this.localStorageTokenHandler.insert(localStorageSections.token, tokens);
		this.tokenSignalHandler.setToken(tokens);
	}

	private redirectUser(user: UserResponseDTO) {
		if (user.role === UserRoles.PLAYER) {
			this.router.navigate(['/player/characters']);

			return;
		}
	}
}
