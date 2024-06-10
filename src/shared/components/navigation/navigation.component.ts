import { CommonModule } from '@angular/common';
import { Component, Input, WritableSignal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserAuthenticatorFetcher } from '@app/modules/auth/fetchers/user-authentication-fetcher.service';
import { UserAuthenticator } from '@app/modules/auth/services/user-authentication.service';
import { UserAuthenticationSignalHandler } from '@app/modules/auth/signal-handlers/user-authentication-signal-handler.service';
import { UserResponseDTO } from '@interfaces/user/user.interface';

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

	public user: WritableSignal<UserResponseDTO> = this.userAuthSignalHandler.getUserAuthenticated();
	constructor(
		private readonly userAuthenticator: UserAuthenticator,
		private readonly userAuthSignalHandler: UserAuthenticationSignalHandler,
	) {}

	toggleSidebar(): void {
		this.isSidebarOpen = !this.isSidebarOpen;
	}

	logout(): void {
		this.userAuthenticator.logout();
	}
}
