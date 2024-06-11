import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserAuthenticator } from '@app/modules/auth/services/user-authentication.service';
import { UserAuthenticationSignalHandler } from '@app/modules/auth/signal-handlers/user-authentication-signal-handler.service';
import { ResponseError } from '@interfaces/core/error.interface';
import { UserRequestDTO, UserResponseDTO } from '@interfaces/user/user.interface';
import { LoadingComponent } from '@shared/components/loading/loading.component';

import { UserRegistratorFetcher } from '../../fetchers/user-registration-fetcher.service';
import { UserRegistrator } from '../../services/user-registration.service';
import { UserRegistratorErrorSignalHandler } from '../../signal-handler/user-registration-error-signal-handler.service';
import { UserRegistratorSignalHandler } from '../../signal-handler/user-registration-signal-handler.service';
import { UserRegistrationConfig } from '../../user-registration.config';

const imports = [CommonModule, RouterLink, ReactiveFormsModule, LoadingComponent];

const providers = [UserRegistrator, UserRegistratorFetcher, UserAuthenticator];

const config = UserRegistrationConfig.actions.register;
@Component({
	selector: 'app-register',
	standalone: true,
	imports,
	providers,
	templateUrl: './register.component.html',
	styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
	formBuilder = inject(FormBuilder);
	userRegistrator = inject(UserRegistrator);
	userRegistratorErrorSignalHandler = inject(UserRegistratorErrorSignalHandler);
	userRegistratorSignalHandler = inject(UserRegistratorSignalHandler);
	userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);

	public user: UserRequestDTO;
	public registerForm: FormGroup;
	public passwordMismatchError: boolean;

	public userSignal: Signal<UserResponseDTO> =
		this.userRegistratorSignalHandler.getUserRegistration(config.sections.register);

	public loadingSignal: Signal<boolean> =
		this.userRegistratorSignalHandler.getUserRegistrationLoading(config.sections.register);

	public errorSignal: Signal<ResponseError> = this.userRegistratorErrorSignalHandler.getErrorSignal(
		config.sections.register,
	);

	public loginLoadingSignal: Signal<boolean> =
		this.userAuthenticationSignalHandler.getSignalLoading();

	ngOnInit(): void {
		this.createForm();
	}

	public submitForm(): void {
		if (!this.registerForm.valid) {
			return;
		}
		const user = this.buildUserInfo();
		this.userRegistrator.registerUser(user);
	}

	private createForm() {
		this.registerForm = this.formBuilder.group({
			name: ['', [Validators.required]],
			email: ['', [Validators.required, Validators.email]],
			role: ['', [Validators.required]],
			repeatPassword: ['', [Validators.required, Validators.minLength(8)]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		});
		this.listenToFormChanges();
	}

	private listenToFormChanges() {
		this.registerForm.valueChanges.subscribe((value) => {
			if (value.password && value.repeatPassword) {
				this.passwordMismatchError = value.password !== value.repeatPassword;
			}
		});
	}

	private buildUserInfo() {
		const user: UserRequestDTO = {
			name: this.registerForm.value.name,
			password: this.registerForm.value.password,
			role: this.registerForm.value.role,
			email: this.registerForm.value.email,
		};

		return user;
	}
}
