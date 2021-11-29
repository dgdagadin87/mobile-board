import axios from 'axios';
import AuthService from './auth-service';

const API_BASE_URL: string = 'https://nvv.elastoo.com/api/';

class ApiService {
	private authService = AuthService;

	private post(url: string, data: any, params: any = {}): Promise<void> {
		return new Promise<void>((resolve, reject) => {
            axios.post(API_BASE_URL + url, data, params)
				.then((response: any) => {
					console.log(response)
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

	public async uploadVideo(name: string, description: string, date: string, file: string): Promise<any> {
		const headers = await this.getHeaders(true);
		const formData: any = new global.FormData();
		formData.append('name', name);
		formData.append('description', description);
		formData.append('date', date);

		formData.append('file', { name: 'file.mov', uri: file, type: 'video/mov' });

		return this.post('videos/sendvideo/', formData, { headers });
	}

	private async getHeaders(isMultiPart: boolean = false): Promise<any> {
		const authData: any = await this.authService.getUserData();

		const result: any = {
			'Authorization': 'Bearer ' + authData.key,
			'Accept': 'application/json',
		};

		if (isMultiPart) {
			result['Content-Type'] = 'multipart/form-data';
		}

		return result;
	}
}

const apiService: ApiService = new ApiService();
export default apiService;

/*
*  {loc: ["body", "file"], msg: "field required", type: "value_error.missing"}
loc: ["body", "file"]
msg: "field required"
type: "value_error.missing"
* */
