import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

export async function checkMultiPermissions(): Promise<void> {
	const { status: cameraStatus1 } = await Camera.getCameraPermissionsAsync();
	if (cameraStatus1 !== 'granted') {
		const { status: cameraStatus2 } = await Camera.requestCameraPermissionsAsync();
		if (cameraStatus2 !== 'granted') {
			alert('Нет доступа к камере');
		}
	}

	const { status: microStatus1 } = await Camera.getMicrophonePermissionsAsync();
	if (microStatus1 !== 'granted') {
		const { status: microStatus2 } = await Camera.requestMicrophonePermissionsAsync();
		if (microStatus2 !== 'granted') {
			alert('Нет доступа к микрофону');
		}
	}

	const { status: galleryStatus1 } = await ImagePicker.getMediaLibraryPermissionsAsync();
	if (galleryStatus1 !== 'granted') {
		const { status: galleryStatus2 } = await ImagePicker.requestMediaLibraryPermissionsAsync();
		if (galleryStatus2 !== 'granted') {
			alert('Нет доступа к галерее');
		}
	}
}

export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = React.useState(false);

	// Load any resources or data that we need prior to rendering the app
	React.useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				await SplashScreen.preventAutoHideAsync();

				// Load fonts
				await Font.loadAsync({
					...FontAwesome.font,
					'space-mono': require('../assets/fonts/SpaceMono-Regular.ttf'),
				});
			}
			catch (e) {
				// We might want to provide this error information to an error reporting service
				console.warn(e);
			}
			finally {
				setLoadingComplete(true);
				await checkMultiPermissions();
				await SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

	return isLoadingComplete;
}
