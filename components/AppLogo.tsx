import * as React from 'react';
import { Dimensions, Image } from 'react-native';

export function AppLogo() {
  	return (
		<Image
			style={{
				position: 'absolute',
				top: '7%',
				left: '29%',
				width: '42%',
				resizeMode: 'stretch',
				height: Dimensions.get('window').width * .3,
			}}
			source={require('../assets/images/logo.png')}
		/>
	);
}
