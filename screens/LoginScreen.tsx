import * as React from 'react';
import {
	StyleSheet,
	ImageBackground,
	Keyboard,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ApiService from '../services/api-service';
import AlertService from '../services/alert-service';
import PlatformService from '../services/platform-service';
import AuthService from '../services/auth-service';
import { changeLogin, changePassword } from '../redux/actions/login';
import { Text, View } from '../components/Themed';
import CorrectKeyboardContainer from '../components/CorrectKeyboardContainer';
import { CustomButton } from '../components/CustomButton';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomError } from '../components/CustomError';
import { CustomLoader } from '../components/CustomLoader';
import { AppLogo } from '../components/AppLogo';

type Props = {
	login: string,
	password: string,
	actions: any,
	navigation: any,
};

class LoginScreen extends React.Component<Props, any> {
	private api = ApiService;
	private alert = AlertService;
	private platform = PlatformService;
	private auth = AuthService;

	constructor(props: Props) {
		super(props);

		this.state = { isLoading: false, error: '' };

		this.onLogin = this.onLogin.bind(this);
		this.changeLogin = this.changeLogin.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.onClearLogin = this.onClearLogin.bind(this);
	}

	public get isButtonDisabled(): boolean {
		const { login, password } = this.props;
		if (!login || !password) {
			return true;
		}

		return false;
	}

	changeLogin(text: string) {
		this.setState({ error: '' }, () => this.props.actions.changeLogin(text));
	}

	changePassword(text: string) {
		this.setState({ error: '' }, () => this.props.actions.changePassword(text));
	}

	onClearLogin() {
		this.setState({ error: '' }, () => this.props.actions.changeLogin(''));
	}

	async onLogin(): Promise<void> {
		if (this.isButtonDisabled) {
			return;
		}

		this.setState({ isLoading: true });
		try {
			const response: any = await this.api.auth(this.props.login, this.props.password);
			this.setState({ isLoading: false });
			await this.auth.auth(response);
			this.props.navigation.navigate('Root');
		}
		catch(err) {
			const errorResponse: any = (err as any).response || {};
			const errorData: any = errorResponse.data || {};
			const errorText: string = errorData.detail || '';
			this.setState({ isLoading: false, error: errorText });
			this.alert.alert('Ошибка', 'Что-то пошло не так');
		}
	}

	register(): void {
		this.props.navigation.navigate('Register');
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}

		return <CustomError error={this.state.error} />;
	}

	renderMain() {
		const { login, password } = this.props;

		return (
			<View style={[styles.container, { height: this.platform.height } ]}>
				<ImageBackground source={require('../assets/images/auth_bg.png')} resizeMode="cover" style={styles.image}>
					<AppLogo />

					<CustomTextInput
						labelText="Введите почту"
						placeholderText="Введите почту"
						isPassword={false}
						value={login}
						onChangeValue={this.changeLogin}
						onClearText={this.onClearLogin}
					/>
					<CustomTextInput
						labelText="Введите пароль"
						placeholderText="Введите пароль"
						isPassword={true}
						value={password}
						onChangeValue={this.changePassword}
					/>

					{ this.renderError() }

					<CustomButton
						buttonText="Войти"
						isDisabled={this.isButtonDisabled}
						onButtonClick={this.onLogin}
					/>

					<View style={{ backgroundColor: 'transparent' }}>
						<Text style={styles.forgotLink}>Забыли пароль?</Text>
					</View>

					<View style={styles.bottom}>
						<View style={styles.haveNoAccount}>
							<Text onPress={() => this.register()} style={styles.haveNoAccountText}>У меня ещё нет аккаунта</Text>
						</View>
						<View style={styles.userAgreement}>
							<Text style={styles.userAgreementText}>Условия пользовательского соглашения</Text>
						</View>
						<View style={styles.publicOffert}>
							<Text style={styles.publicOffertText}>Публичная оферта</Text>
						</View>
					</View>

					{ this.state.isLoading ? <CustomLoader /> : null }
				</ImageBackground>
			</View>
		);
	}

	renderLoader() {
        if (!this.state.isLoading) {
            return null;
        }

        return <CustomLoader />;
    }

	render() {
		if (this.platform.isWeb) {
			return this.renderMain();
		}

		return (
			<CorrectKeyboardContainer>
				{this.renderMain()}
			</CorrectKeyboardContainer>
		);
	}
};

const mapStateToProps = (state: any) => ({
	login: state.loginData.login,
	password: state.loginData.password,
});

const ActionCreators = Object.assign(
	{},
	{ changeLogin, changePassword }
);
const mapDispatchToProps = (dispatch: any) => ({
  	actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	forgotLink: {
		textAlign: 'center',
		textDecorationLine: 'underline',
		fontSize: 14,
		paddingTop: 20,
		color: '#333',
	},
	bottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		backgroundColor: 'transparent',
	},
	haveNoAccount: {
		backgroundColor: 'transparent',
		paddingBottom: 15,
		width: '100%'
	},
	haveNoAccountText: {
		color: '#333',
		fontSize: 18,
		backgroundColor: 'transparent',
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	userAgreement: {
		backgroundColor: 'transparent',
		paddingBottom: 15
	},
	userAgreementText: {
		color: '#333',
		fontSize: 14,
		backgroundColor: 'transparent',
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	publicOffert: {
		backgroundColor: 'transparent',
		paddingBottom: 25
	},
	publicOffertText: {
		color: '#333',
		fontSize: 14,
		backgroundColor: 'transparent',
		textAlign: 'center',
		textDecorationLine: 'underline',
	},
	image: {
		flex: 1,
		justifyContent: "center",
		width: '100%',
		height: '100%'
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
