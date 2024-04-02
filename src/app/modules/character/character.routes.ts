import { Routes } from '@angular/router';

export const CharacterRoutes: Routes = [
	{
		path: 'create',
		loadComponent: () =>
			import('./pages/character-create/character-create.component').then(
				(c) => c.CharacterCreateComponent,
			),
	},
	{
		path: ':id/edit',
		loadComponent: () =>
			import('./pages/character-edit/character-edit.component').then(
				(c) => c.CharacterEditComponent,
			),
	},
	{
		path: ':id',
		loadComponent: () =>
			import('./pages/character-view/character-view.component').then(
				(c) => c.CharacterViewComponent,
			),
	},
];
