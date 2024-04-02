import { Injectable } from '@angular/core';
import { TokenProcessed } from '@interfaces/core/token.interface';
import { interval, Observable, take } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class TokenRefreshHandler {
	protected refreshTokenPeriod$: Observable<number> | undefined;

	public run(tokens: TokenProcessed, minutesPrevious = 1, ref = 2): void {
		const unixDate: number = Math.floor(Date.now() / 1000);
		const diffDates: number = tokens.expiresIn - unixDate;
		const partialPeriod: number = Math.floor(diffDates / ref);
		const intervalToGetTokens: number = (partialPeriod - minutesPrevious * 60) * 1000;

		if (!this.refreshTokenPeriod$) {
			this.refreshTokenPeriod$ = interval(intervalToGetTokens).pipe(take(1));
		}
	}

	public getRefreshTokenPeriodObservable(): Observable<number> | undefined {
		if (this.refreshTokenPeriod$) {
			return this.refreshTokenPeriod$;
		}

		return undefined;
	}

	public resetRefreshTokenPeriodObservable(): void {
		this.refreshTokenPeriod$ = undefined;
	}
}
