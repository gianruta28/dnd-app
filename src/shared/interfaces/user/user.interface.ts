import { ModelInterface } from '@interfaces/core/model.interface';

export interface UserRequestDTO {
	email: string;
	name: string;
	password: string;
	role: string;
}
export interface UserResponseDTO {
	id: string;
	email: string;
	name: string;
	role: string;
}

export interface AuthUserRequest {
	username: string;
	password: string;
}
export interface UserResponse extends ModelInterface {
	data: UserResponseDTO;
}

export interface UserChangePassword {
	oldPassword: string;
	password: string;
}
