import { Routes } from '@angular/router';

export const PlayerRoutes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'characters',
	},
	{
		path: 'characters',
		loadComponent: () =>
			import('./pages/player-characters/player-characters.component').then(
				(c) => c.PlayerCharactersComponent,
			),
	},
];
