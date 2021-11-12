import { Alert } from 'react-native';
import PlatformService from './platform-service';

class AlertService {

	private platform = PlatformService;

	public alert(title: string, message: string): void {
		if (this.platform.isWeb) {
			(<any>window).alert(message);
			return;
		}
		Alert.alert(title, message, [], {cancelable: true});
	}

}

const alertService: AlertService = new AlertService();
export default alertService;
