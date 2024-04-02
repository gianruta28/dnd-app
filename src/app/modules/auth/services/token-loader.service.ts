import { inject, Injectable } from '@angular/core';
import { TokenProcessed } from '@interfaces/core/token.interface';
import { UserResponseDTO } from '@interfaces/user/user.interface';
import { LocalStorageHandler } from '@services/local-storage-handler.service';

import { authConfig } from '../auth.config';
import { TokenSignalHandler } from '../signal-handlers/token-signal-handler.service';
import { UserAuthenticationSignalHandler } from '../signal-handlers/user-authentication-signal-handler.service';
import { TokenExpiryChecker } from './token-expiry-checker.service';
import { TokenRefresher } from './token-refresher.service';

const localStorageSection = authConfig.actions.localStorage.sections;

@Injectable()
export class TokenLoader {
	userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);
	tokenSignalHandler = inject(TokenSignalHandler);
	localStorageUserHandler: LocalStorageHandler<UserResponseDTO> = <
		LocalStorageHandler<UserResponseDTO>
	>inject(LocalStorageHandler<UserResponseDTO>);

	localStorageTokenHandler: LocalStorageHandler<TokenProcessed> = <
		LocalStorageHandler<TokenProcessed>
	>inject(LocalStorageHandler<TokenProcessed>);

	tokenExpiryChecker = inject(TokenExpiryChecker);
	tokenRefresher = inject(TokenRefresher);

	public async run(): Promise<void> {
		const tokens = this.getTokensFromStorage();
		const user = this.getUserFromStorage();
		if (!tokens || !user) {
			return;
		}
		this.userAuthenticationSignalHandler.setUserAuthenticated(user);
		// Todo if token is from user
		if (this.tokenExpiryChecker.run(tokens.expiresIn)) {
			await this.tokenRefresher.refreshToken(tokens.refreshToken, true);

			return;
		}

		this.localStorageTokenHandler.insert(localStorageSection.token, tokens);

		this.tokenSignalHandler.setToken(tokens);
		this.localStorageUserHandler.insert(localStorageSection.user, user);
		this.tokenRefresher.listenTokenRefresh(tokens);
	}

	private getTokensFromStorage(): TokenProcessed {
		return this.localStorageTokenHandler.read(localStorageSection.token);
	}

	private getUserFromStorage(): UserResponseDTO {
		return this.localStorageUserHandler.read(localStorageSection.user);
	}
}
