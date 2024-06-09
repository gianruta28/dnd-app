import { Routes } from '@angular/router';
import { UserGuard } from '@shared/guards/user.guard';

export const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'auth',
	},
	{
		path: 'auth',
		loadChildren: () => import('./modules/auth/auth.routes').then((r) => r.AuthRoutes),
	},
	{
		path: 'register',
		loadChildren: () =>
			import('./modules/user-registration/user-registration.routes').then(
				(r) => r.UserRegistrationRoutes,
			),
	},
	{
		path: 'player',
		loadChildren: () => import('./modules/player/player.routes').then((r) => r.PlayerRoutes),
		canActivate: [UserGuard],
	},
	{
		path: 'character',
		loadChildren: () =>
			import('./modules/character/character.routes').then((r) => r.CharacterRoutes),
		canActivate: [UserGuard],
	},
];
