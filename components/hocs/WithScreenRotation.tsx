import React, { Component } from 'react';
import * as ScreenOrientation from 'expo-screen-orientation';

const withScreenRotation = (WrappedComponent: any) => {
	class RotationScreen extends Component<any, any> {

		constructor(props: any) {
			super(props);

			props.navigation.addListener('focus', async () => {
				await ScreenOrientation.unlockAsync();
			});

			props.navigation.addListener('blur', async () => {
				await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
			});
		}

		render() {
			return <WrappedComponent {...this.props} />;
		}
	}

	return RotationScreen;
};

export default withScreenRotation;
