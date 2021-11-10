import { Alert } from 'react-native';

class AlertService {

	public alert(title: string, message: string): void {
		Alert.alert(title, message);
	}

}

const alertService: AlertService = new AlertService();
export default alertService;
