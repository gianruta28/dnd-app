import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticatorFetcher } from '@app/modules/auth/fetchers/user-authentication-fetcher.service';
import { UserAuthenticator } from '@app/modules/auth/services/user-authentication.service';

const providers = [UserAuthenticator, UserAuthenticatorFetcher];

@Component({
	selector: 'app-navigation',
	templateUrl: 'navigation.template.html',
	styleUrl: 'navigation.component.scss',
	providers,
	standalone: true,
	imports: [CommonModule, RouterLink],
})
export class NavigationComponent {
	@Input() title: string;
	isSidebarOpen = false;

	constructor(private readonly userAuthenticator: UserAuthenticator) {}

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	logout(): void {
		this.userAuthenticator.logout();
	}
}
