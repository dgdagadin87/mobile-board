import axios from 'axios';
import AuthService from './auth-service';
import base64 from 'react-native-base64'

const API_BASE_URL: string = 'https://nvv.elastoo.com/api/';

/*function dataURItoBlob(dataURI: any) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	let byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = base64.decode(dataURI.split(',')[1]);
	else
		byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	let ia = new Uint8Array(byteString.length);
	for (let i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], {type:mimeString});
}*/

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
