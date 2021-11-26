import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text } from './Themed';
import platform from '../services/platform-service';

export type CustomTextInputProps = {
	isTextarea?: boolean;
	value: string,
	labelText: string,
	onChangeValue: any,
	isPassword: boolean,
	placeholderText: string,
	customLabelStyles?: { [key: string]: string | number },
	customInputStyles?: { [key: string]: string | number },
};

export function CustomTextInput(props: CustomTextInputProps) {
	const {
		customInputStyles = null,
		customLabelStyles = null,
		isTextarea = false,
	} = props;

	const getInputStyles = (): any => {
		const resultStyles: any[] = [styles.input];

		if (customInputStyles) {
			resultStyles.push(customInputStyles);
		}

		if (isTextarea && platform.isIos ) {
			resultStyles.push({ height: 125 });
		}

		return resultStyles;
	}

  	return (
  		<>
			<Text
				style={ customLabelStyles ? [styles.label, customLabelStyles] : styles.label }
			>{props.labelText}</Text>
			<TextInput
				multiline={isTextarea}
				numberOfLines={isTextarea ? 5 : 1}
				secureTextEntry={props.isPassword}
				style={getInputStyles()}
				onChangeText={props.onChangeValue}
				value={props.value}
				placeholder={props.placeholderText}
			/>
		</>
	);
}

const styles = StyleSheet.create({
	label: {
		marginLeft: '15%',
		color: '#333',
		fontSize: 15,
		fontWeight: 'bold',
	},
	input: {
		width: '70%',
		backgroundColor: '#fff',
		padding: 7,
		marginLeft: '15%',
		marginBottom: 10,
		marginTop: 5,
		fontSize: 14,
		borderWidth: 1,
		borderColor: '#999999',
		borderStyle: 'solid'
	},
});
