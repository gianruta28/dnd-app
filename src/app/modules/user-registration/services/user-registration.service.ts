import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserAuthenticator } from '@app/modules/auth/services/user-authentication.service';
import { UserRequestDTO } from '@interfaces/user/user.interface';

import { UserRegistratorFetcher } from '../fetchers/user-registration-fetcher.service';
import { UserRegistratorErrorSignalHandler } from '../signal-handler/user-registration-error-signal-handler.service';
import { UserRegistratorSignalHandler } from '../signal-handler/user-registration-signal-handler.service';
import { UserRegistrationConfig } from '../user-registration.config';

@Injectable()
export class UserRegistrator {
	private readonly config = UserRegistrationConfig;
	constructor(
		private readonly userRegistrator: UserRegistratorFetcher,
		private readonly userRegistratorErrorSignalHandler: UserRegistratorErrorSignalHandler,
		private readonly userRegistratorSignalHandler: UserRegistratorSignalHandler,
		private readonly userAuthenticator: UserAuthenticator,
	) {}

	public registerUser(data: UserRequestDTO): void {
		const users$ = this.userRegistrator.run(data);
		this.userRegistratorSignalHandler.userRegistrationLoading(
			this.config.actions.register.sections.register,
		);
		users$.subscribe({
			next: (response) => {
				if (!response.body) {
					return;
				}
				this.userRegistratorSignalHandler.cleanUserSection(
					this.config.actions.register.sections.register,
				);
				this.userRegistratorSignalHandler.setUserRegistered(
					this.config.actions.register.sections.register,
					response.body,
				);
				this.userRegistratorSignalHandler.userRegistrationLoaded(
					this.config.actions.register.sections.register,
				);
				const userLoginData = {
					username: data.email,
					password: data.password,
				};
				this.userAuthenticator.login(userLoginData);
			},
			error: (error: HttpErrorResponse) => {
				this.userRegistratorSignalHandler.userRegistrationLoaded(
					this.config.actions.register.sections.register,
				);

				this.userRegistratorErrorSignalHandler.updateErrorSection(
					this.config.actions.register.sections.register,
					{
						code: error.status,
						message: 'Error',
					},
				);
			},
		});
	}
}
