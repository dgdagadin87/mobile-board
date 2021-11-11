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

	private storage = StorageService;

	public async isAuth(): Promise<boolean> {
		const authData: any = await this.storage.getData('auth');
		if (authData && !!authData.key && !!authData.email && !!authData.username) {
			return true;
		}

		return false;
	}

}

const authService: AuthService = new AuthService();
export default authService;
