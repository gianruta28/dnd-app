import { inject, Injectable } from '@angular/core';
import { TokenProcessed } from '@interfaces/core/token.interface';
import { UserResponseDTO } from '@interfaces/user/user.interface';
import { Subscription } from 'rxjs';
import { LocalStorageHandler } from 'src/shared/services/local-storage-handler.service';
import { TokenRefreshHandler } from 'src/shared/services/token-refresh-handler.service';

import { AsyncUserFinderFetcher } from '../../user/fetchers/async-user-finder-fetcher.service';
import { RefreshTokenFetcher } from '../fetchers/token-refresher-fetcher.service';
import { TokenSignalHandler } from '../signal-handlers/token-signal-handler.service';
import { UserAuthenticationSignalHandler } from '../signal-handlers/user-authentication-signal-handler.service';
import { UserAuthenticatorTokenHandler } from '../signal-handlers/user-authentication-token-handler.service';

@Injectable({
	providedIn: 'root',
})
export class TokenRefresher {
	tokenRefreshHandler = inject(TokenRefreshHandler);
	tokenRefresherFetcher = inject(RefreshTokenFetcher);
	userAuthenticatorTokenHanlder = inject(UserAuthenticatorTokenHandler);

	asyncUserFinderFetcher = inject(AsyncUserFinderFetcher);
	tokenSignalHandler = inject(TokenSignalHandler);
	userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);
	protected refreshTokenSubscription: Subscription;

	constructor(
		private readonly localStorageTokenHandler: LocalStorageHandler<TokenProcessed>,
		private readonly localStorageUserHandler: LocalStorageHandler<UserResponseDTO>,
	) {}

	public listenTokenRefresh(tokens: TokenProcessed): void {
		this.tokenRefreshHandler.run(tokens);
		const refreshTokenObservable = this.tokenRefreshHandler.getRefreshTokenPeriodObservable();

		if (refreshTokenObservable) {
			this.refreshTokenSubscription = refreshTokenObservable.subscribe({
				next: () => {
					this.refreshToken(tokens.refreshToken);
				},
			});
		}
	}

	public async refreshToken(refreshToken: string, updateUser = false): Promise<void> {
		const refreshFetch = await this.tokenRefresherFetcher.run(refreshToken);
		if (!refreshFetch.body) {
			return;
		}

		const { tokens, tokenDecoded } = this.userAuthenticatorTokenHanlder.run(refreshFetch.body);
		const userResponse = await this.asyncUserFinderFetcher.run(tokens.token);

		if (!userResponse.body) {
			return;
		}

		this.userAuthenticationSignalHandler.setUserAuthenticated(userResponse.body);
		this.localStorageUserHandler.insert('user-authenticated', userResponse.body);
		this.localStorageTokenHandler.insert('user-tokens', tokens);
		this.tokenSignalHandler.setToken(tokens);

		// Not sure what to do here. But probably do something
		// if (updateUser && tokenDecoded.email) {
		// }

		this.listenTokenRefresh(tokens);
	}
}
