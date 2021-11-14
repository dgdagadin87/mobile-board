import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, } from 'react-native';

const DismissKeyboard = ({ children }: any) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
		{children}
	</TouchableWithoutFeedback>
);

const withKeyboardDismiss = (WrappedComponent: any) => {
	class WithKeyboardDismissScreen extends Component {
		render() {
			return (
				<DismissKeyboard>
					<WrappedComponent {...this.props} />
				</DismissKeyboard>
			);
		}
	}

	return WithKeyboardDismissScreen;
};

export default withKeyboardDismiss;
