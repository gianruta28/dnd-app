import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthUserRequest } from '@interfaces/user/user.interface';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingComponent } from '@shared/components/loading/loading.component';

import { UserAuthenticator } from '../../services/user-authentication.service';
import { UserAuthenticationSignalHandler } from '../../signal-handlers/user-authentication-signal-handler.service';

const imports = [LoadingComponent, CommonModule, RouterLink, ReactiveFormsModule, TranslateModule];

const providers = [UserAuthenticator];

@Component({
	selector: 'app-login',
	standalone: true,
	imports,
	providers,
	templateUrl: './login.component.html',
	styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
	public loginForm: FormGroup;
	fb = inject(FormBuilder);
	userAuthenticator = inject(UserAuthenticator);
	userAuthenticationSignalHandler = inject(UserAuthenticationSignalHandler);

	public loginLoadingSignal: Signal<boolean> =
		this.userAuthenticationSignalHandler.getSignalLoading();

	ngOnInit(): void {
		this.createForm();
	}

	public submit(): void {
		this.userAuthenticator.login(this.loginForm.value as AuthUserRequest);
	}

	private createForm() {
		this.loginForm = this.fb.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required, Validators.minLength(8)]],
		});
	}
}
