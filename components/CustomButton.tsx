import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import { Text } from './Themed';

export type CustomButtonProps = {
	isDisabled: boolean,
	buttonText: string,
	customStyles?: any;
	onButtonClick: any,
};

export function CustomButton(props: CustomButtonProps) {
	const buttonStyle: any = {
		flexDirection: 'row',
		height: 40,
		backgroundColor: props.isDisabled ? 'grey' : '#0099cc',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		elevation:3,
		width: '70%',
		marginLeft: '15%',
		borderRadius: 3
	};

  	return (
		<TouchableOpacity
			activeOpacity={0.5}
			style={!props.customStyles ? buttonStyle : [buttonStyle, props.customStyles]}
			onPress={props.onButtonClick}
		>
			<Text style={{
				fontSize: 18,
				fontWeight: 'bold',
				color: '#fff'
			}}>{props.buttonText}</Text>
		</TouchableOpacity>
	);
}
