import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Themed';

export type CustomButtonProps = {
	isDisabled: boolean,
	buttonText: string,
	onButtonClick: any,
};

export function CustomButton(props: CustomButtonProps) {
  	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={{
				flexDirection: 'row',
				height: 40,
				backgroundColor: props.isDisabled ? 'grey' : '#0099cc',
				alignItems: 'center',
				justifyContent: 'center',
				marginTop: 15,
				elevation:3,
				width: '70%',
				marginLeft: '15%'
			}}
			onPress={props.onButtonClick}
		>
			<Text style={{
				fontSize: 18,
				fontWeight: 'bold',
				color: '#fff'
			}}>Войти</Text>
		</TouchableOpacity>
	);
}
