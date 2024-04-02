import { Injectable } from '@angular/core';
import { TokenHandler } from '@services/token-handler.service';

@Injectable()
export class TokenExpiryChecker extends TokenHandler {
	public run(expiresIn: number): boolean {
		return this.checkTokenExpired(expiresIn);
	}
}
