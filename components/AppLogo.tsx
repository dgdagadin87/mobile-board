import * as React from 'react';
import { Image } from 'react-native';
import PlatformService from '../services/platform-service';

const platform = PlatformService;

export function AppLogo() {
  	return (
		<Image
			style={{
				position: 'absolute',
				top: '7%',
				left: '29%',
				width: '42%',
				resizeMode: 'stretch',
				height: platform.width * .3,
			}}
			source={require('../assets/images/logo.png')}
		/>
	);
}
