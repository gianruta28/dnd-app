import { Injectable } from '@angular/core';
import { Token, TokenDecoded, UserAuthenticatedTokens } from '@interfaces/core/token.interface';
import { TokenHandler } from 'src/shared/services/token-handler.service';

@Injectable()
export class UserAuthenticatorTokenHandler extends TokenHandler {
	public run(token: Token): UserAuthenticatedTokens {
		const tokenDecoded = this.parseJWT(token.token);
		const refreshTokenDecoded = {
			token: token.refreshToken,
			expiresIn: token.refreshTokenExpiresIn,
		};

		const tokens = this.processTokens(token, tokenDecoded, refreshTokenDecoded);

		return {
			tokens,
			tokenDecoded: tokenDecoded as TokenDecoded,
		};
	}
}
