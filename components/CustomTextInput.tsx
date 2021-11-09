import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { Text } from './Themed';

export type CustomTextInputProps = {
	value: string,
	labelText: string,
	onChangeValue: any,
	isPassword: boolean,
	placeholderText: string
};

export function CustomTextInput(props: CustomTextInputProps) {
  	return (
  		<React.Fragment>
			<Text style={styles.label}>{props.labelText}</Text>
			<TextInput
				secureTextEntry={props.isPassword}
				style={styles.input}
				onChangeText={(text: string) => props.onChangeValue(text)}
				value={props.value}
				placeholder={props.placeholderText}
			/>
		</React.Fragment>
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
