import { JwtPayload } from 'jwt-decode';

export interface Token {
	token: string;
	refreshToken: string;
	refreshTokenExpiresIn: number;
}

export interface RefreshToken {
	token: string;
	expiresIn: number;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface TokenProcessed extends Token {
	expiresIn: number;
}

export interface TokenDecoded extends JwtPayload {
	email?: string;
	roles?: string[];
}

export interface UserAuthenticatedTokens {
	tokens: TokenProcessed;
	tokenDecoded: TokenDecoded;
}
