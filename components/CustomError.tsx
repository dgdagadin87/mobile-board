import * as React from 'react';
import { View, Text } from './Themed';

export type CustomErrorProps = {
	error: any,
};

export const ErrorNames: { [key: string]: string } = {
	'name.ensure this value has at least 3 characters': 'Имя должно содержать как минимум 3 cимвола',
	'email.value is not a valid email address': 'Электронная почта должна быть валидной',
	'username.ensure this value has at least 3 characters': 'Имя пользователя должно содержать как минимум 3 cимвола',
	'password.ensure this value has at least 8 characters': 'Пароль должен содержать как минимум 8 символов',
};

export function CustomError(props: CustomErrorProps) {
	if (!props.error) {
		return null;
	}

	const renderError = (errorText: string) => {
		return (
			<View style={{ backgroundColor: 'transparent', marginTop: 5 }}>
				<Text style={{
					fontSize: 16,
					color: 'red',
					marginLeft: '15%',
					marginRight: '15%',
				}}>{errorText}</Text>
			</View>
		);
	}

	const getErrors = (details: any[]) => {
		return details.map((detail: any) => {
			const loc: any[] = detail.loc || [];
			const msg: string = detail.msg;

			return ErrorNames[loc[1] + '.' + msg] || '';
		});
	};

	let correctErrors: string[] = [];

	if (typeof props.error === 'string') {
		correctErrors = [props.error];
	}
	else {
		correctErrors = [getErrors(props.error)[0]];
	}

  	return (
		<>{
			correctErrors.map((text) => renderError(text))
		}</>
	);
}
