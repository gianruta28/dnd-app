import { Injectable, Signal, WritableSignal } from '@angular/core';
import { Token } from '@interfaces/core/token.interface';
import { SignalHandler } from '@services/signal-handler.service';

import { authConfig } from '../auth.config';

@Injectable({
	providedIn: 'root',
})
export class TokenSignalHandler extends SignalHandler<Token> {
	private readonly tokensSection = authConfig.actions.authentication.sections.tokens;
	private readonly currentTokensSignal: Signal<Token> = this.getToken();

	public getToken(): WritableSignal<Token> {
		return this.getDataSignal(this.tokensSection);
	}

	public setToken(token: Token): void {
		this.replaceDataSignal(this.tokensSection, token);
	}

	public getCurrentAccessToken(): string {
		return this.currentTokensSignal().token;
	}

	public getCurrentRefreshToken(): string {
		return this.currentTokensSignal().refreshToken;
	}

	public cleanTokens(): void {
		this.cleanSection(this.tokensSection);
	}
}
