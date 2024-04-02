import { Routes } from '@angular/router';

export const UserRegistrationRoutes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('../user-registration/pages/register/register.component').then(
				(c) => c.RegisterComponent,
			),
	},
];
