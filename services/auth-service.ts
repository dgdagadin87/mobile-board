import StorageService from './storage-service';

class AuthService {

	private storage = StorageService;

	public async auth(authData: any): Promise<void> {
		await this.storage.setData('auth', authData);
	}

	public async exit(): Promise<void> {
		await this.storage.removeData('auth');
	}

	public async isAuth(): Promise<boolean> {
		const authData: any = await this.storage.getData('auth');
		if (authData && !!authData.key && !!authData.email && !!authData.username) {
			return true;
		}

		return false;
	}

	public async getUserData(): Promise<any> {
		const data: any = await this.storage.getData('auth');
		return data;
	}

}

const authService: AuthService = new AuthService();
export default authService;
