import StorageService from './storage-service';

export type UserData = {
	key: string;
	created_at: string;
	email: string;
	is_active: boolean;
	is_staff: boolean;
	is_superuser: boolean;
	personal_data: boolean;
	user_agreement: boolean;
	username: string;
}

class AuthService {

	public async isAuth(): Promise<boolean> {
		return true;
	}

	/*public async getAuthData(): UserData {

	}*/

}

const authService: AuthService = new AuthService();
export default authService;
