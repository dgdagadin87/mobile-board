import * as React from 'react';
import { Image } from 'react-native';
import PlatformService from '../services/platform-service';

const platform = PlatformService;

export function AppLogo() {
  	return (
		<Image
			style={{
				position: 'absolute',
				top: '8%',
				left: (platform.width*.5 - 105),
				width: 210,
				resizeMode: 'stretch',
				height: 120,
			}}
			source={require('../assets/images/logo.png')}
		/>
	);
}
