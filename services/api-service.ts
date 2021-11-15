import axios from 'axios';

const API_BASE_URL: string = 'https://nvv.elastoo.com/api/';

class ApiService {

	private post(url: string, data: any, params: any = {}): Promise<void> {
		return new Promise<void>((resolve, reject) => {
            axios.post(API_BASE_URL + url, data, params)
				.then((response: any) => {
					const data: any = response.data;

					if (!data) {
						reject();
					}

					resolve(data);
				})
				.catch((error) => reject(error));
        });
	}

	public auth(login: string, password: string): Promise<void> {
		return this.post('account/auth/', { email: login, password: password });
	}

	public register(name: string, password: string, username: string, email: string): Promise<void> {
		return this.post('account/registration/', {
			email, password,
			username, name,
			is_active: true,
			personal_data: true,
			user_agreement: true
		});
	}

}

const apiService: ApiService = new ApiService();
export default apiService;
