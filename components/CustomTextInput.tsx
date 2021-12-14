import * as React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Text, View } from './Themed';
import platform from '../services/platform-service';

export type CustomTextInputProps = {
	value: string,
	labelText: string,
	onChangeValue: any,
	isPassword: boolean,
	placeholderText: string,
	inputMask?: string,
	isTextarea?: boolean,
	numOfStrings?: number,
	customLabelStyles?: { [key: string]: string | number },
	customInputStyles?: { [key: string]: string | number },
};

export function CustomTextInput(props: CustomTextInputProps) {
	const {
		customInputStyles = null,
		customLabelStyles = null,
		isTextarea = false,
		numOfStrings = 1,
		inputMask = false,
	} = props;

	const getInputStyles = (): any => {
		const resultStyles: any[] = [styles.input];

		if (customInputStyles) {
			resultStyles.push(customInputStyles);
		}

		if (isTextarea && platform.isIos ) {
			resultStyles.push({ height: numOfStrings*25 });
		}

		return resultStyles;
	}

	const renderLabel = () => (
		<Text
			style={ customLabelStyles ? [styles.label, customLabelStyles] : styles.label }
		>
			{props.labelText}
		</Text>
	);

	if (inputMask) {
		return (
			<View style={{ backgroundColor: 'transparent' }}>
				{ renderLabel() }
				<MaskedTextInput
					mask={inputMask}
					style={getInputStyles()}
					value={props.value}
					placeholder={props.placeholderText}
					onChangeText={(text: string) => props.onChangeValue(text)}
				/>
			</View>
		);
	}

  	return (
  		<View style={{ backgroundColor: 'transparent' }}>
			{ renderLabel() }
			<TextInput
				multiline={isTextarea}
				numberOfLines={isTextarea ? 5 : 1}
				secureTextEntry={props.isPassword}
				style={getInputStyles()}
				onChangeText={props.onChangeValue}
				value={props.value}
				placeholder={props.placeholderText}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	label: {
		marginLeft: '15%',
		width: '70%',
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
		borderStyle: 'solid',
		borderRadius: 3
	},
});
