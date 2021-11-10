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

}

const apiService: ApiService = new ApiService();
export default apiService;
