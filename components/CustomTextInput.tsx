import * as React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { StyleSheet, TextInput } from 'react-native';
import { MaskedTextInput } from 'react-native-mask-text';
import { Text, View } from './Themed';
import platform from '../services/platform-service';

export type CustomTextInputProps = {
	value: string,
	labelText: string,
	onChangeValue: any,
	onClearText?: any,
	isPassword: boolean,
	placeholderText: string,
	inputMask?: string,
	isTextarea?: boolean,
	numOfStrings?: number,
	customLabelStyles?: { [key: string]: string | number },
	customInputStyles?: { [key: string]: string | number },
	customIconStyles?:  { [key: string]: string | number },
};

export function CustomTextInput(props: CustomTextInputProps) {
	const [isVisible, setIsVisible] = React.useState(false);

	const {
		customInputStyles = null,
		customLabelStyles = null,
		customIconStyles = null,
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
				{props.onClearText && !props.isPassword && !props.isTextarea ? <FontAwesome
					name={ 'times' }
					size={23}
					color={ '#777' }
					onPress={props.onClearText} 
					style={customIconStyles ? [styles.icon, customIconStyles] : styles.icon}
				/> : null}
			</View>
		);
	}

  	return (
  		<View style={{ backgroundColor: 'transparent' }}>
			{props.onClearText && !props.isPassword && !props.isTextarea ? <FontAwesome
				name={ 'times' }
				size={23}
				color={ '#777' }
				onPress={props.onClearText} 
				style={customIconStyles ? [styles.icon, customIconStyles] : styles.icon}
			/> : null}
			{props.isPassword ? <FontAwesome
				name={ isVisible ? 'eye-slash' : 'eye' }
				size={23}
				color={ '#777' }
				onPress={() => {setIsVisible(!isVisible)}} 
				style={customIconStyles ? [styles.icon, customIconStyles] : styles.icon}
			/> : null}
			{ renderLabel() }
			<TextInput
				multiline={isTextarea}
				numberOfLines={isTextarea ? 5 : 1}
				secureTextEntry={props.isPassword && !isVisible}
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
		padding: 5,
		marginLeft: '15%',
		marginBottom: 10,
		marginTop: 5,
		fontSize: 14,
		borderWidth: 1,
		borderColor: '#999999',
		borderStyle: 'solid',
		borderRadius: 3,
		textAlignVertical: 'top'
	},
	icon: {
		zIndex: 1000,
		position: 'absolute',
		top: 20,
		paddingTop: 5,
		paddingBottom: 5,
		paddingRight: platform.width*.03,
		paddingLeft: platform.width*.03,
		right: platform.width*.13,
	},
});
