import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { TokenLoader } from './modules/auth/services/token-loader.service';

@Component({
	selector: 'app-root',
	standalone: true,
	imports: [CommonModule, RouterOutlet],
	templateUrl: './app.component.html',
	styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
	title = 'webapp2.0';
	constructor(
		private readonly tokenLoaded: TokenLoader,
		private readonly activatedRoute: ActivatedRoute,
		translate: TranslateService,
	) {
		translate.setDefaultLang('es');

		// the lang to use, if the lang isn't available, it will use the current loader to get them
		translate.use('es');
	}
	// this language will be used as a fallback when a translation isn't found in the current language

	ngOnInit(): void {
		this.tokenLoaded.run();
	}
}
