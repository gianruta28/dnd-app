import { HttpClient, provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideIonicAngular } from '@ionic/angular/standalone';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { UserGuard } from '@shared/guards/user.guard';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { RefreshTokenFetcher } from './modules/auth/fetchers/token-refresher-fetcher.service';
import { UserAuthenticatorFetcher } from './modules/auth/fetchers/user-authentication-fetcher.service';
import { TokenExpiryChecker } from './modules/auth/services/token-expiry-checker.service';
import { TokenLoader } from './modules/auth/services/token-loader.service';
import { TokenSignalHandler } from './modules/auth/signal-handlers/token-signal-handler.service';
import { UserAuthenticatorTokenHandler } from './modules/auth/signal-handlers/user-authentication-token-handler.service';
import { AsyncUserFinderFetcher } from './modules/user/fetchers/async-user-finder-fetcher.service';

// TODO Make Services and Guard Singleton so theres no need to set them as provider here
// to make them singleton just put providedIn: 'root' in its Injectable decorator
export const appConfig: ApplicationConfig = {
	providers: [
		provideRouter(routes),
		provideHttpClient(),
		provideAnimations(),
		provideToastr(),
		provideIonicAngular(),
		RefreshTokenFetcher,
		TokenLoader,
		TokenSignalHandler,
		UserAuthenticatorTokenHandler,
		AsyncUserFinderFetcher,
		UserAuthenticatorFetcher,
		TokenExpiryChecker,
		TranslateModule.forRoot({
			defaultLanguage: 'es',
			loader: {
				provide: TranslateLoader,
				useFactory: HttpLoaderFactory,
				deps: [HttpClient],
			},
		}).providers!,
		UserGuard,
	],
};

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
	return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
