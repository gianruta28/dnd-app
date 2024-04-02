import { Injectable } from '@angular/core';
import { RefreshToken, Token, TokenProcessed } from '@interfaces/core/token.interface';
import { jwtDecode, JwtPayload } from 'jwt-decode';

@Injectable()
export class TokenHandler {
	protected parseJWT(token: string): JwtPayload {
		return jwtDecode(token);
	}

	protected processTokens(
		tokens: Token,
		tokenDecoded: JwtPayload,
		refreshTokenDecoded: RefreshToken,
	): TokenProcessed {
		const reduceTime = 0;
		const { refreshToken, token } = tokens;
		if (!tokenDecoded.exp) {
			return {
				token: '',
				refreshToken: '',
				expiresIn: 0,
				refreshTokenExpiresIn: 0,
			};
		}
		const expiresIn = tokenDecoded.exp - reduceTime;
		const refreshTokenExpiresIn = refreshTokenDecoded.expiresIn - reduceTime;

		return {
			token,
			refreshToken,
			expiresIn,
			refreshTokenExpiresIn,
		};
	}

	protected checkTokenExpired(expiresIn = 0): boolean {
		const unixDate = Math.floor(Date.now() / 1000);
		const isExpired = expiresIn <= unixDate;

		return isExpired;
	}
}
