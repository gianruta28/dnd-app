export const userConfig = {
	actions: {
		view: {
			sections: {
				getUser: 'get-user',
			},
		},
		edit: {
			sections: {
				editUser: 'edit-user',
				changePassword: 'change-password',
			},
		},
		list: {
			sections: {
				listUsers: 'list-users',
			},
			table: {
				rows: 4,
				options: {
					header: 'Options',
					elements: [
						{
							id: 'view',
							action: 'redirect',
							redirectUrl: '/user/{id}',
							urlParam: 'id',
							icon: 'fa-thin fa-info',
						},
						{
							id: 'edit',
							action: 'redirect',
							redirectUrl: '/user/edit/{id}',
							urlParam: 'id',
							icon: 'fa-thin fa-pencil',
						},
					],
				},
				valuesToDisplay: {
					accessors: ['id', 'name', 'email'],
					headers: ['Id', 'Name', 'Email'],
				},
			},
		},
		delete: {
			sections: {
				delete: 'delete-user',
			},
		},
	},
};
