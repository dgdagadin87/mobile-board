import * as React from 'react';
import { Dimensions, Image } from 'react-native';

export function AppLogo() {
  	return (
		<Image
			style={{
				position: 'absolute',
				top: '3%',
				left: '29%',
				width: '42%',
				height: Dimensions.get('window').width * .3,
			}}
			source={require('../assets/images/logo.svg')}
		/>
	);
}
