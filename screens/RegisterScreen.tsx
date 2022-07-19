import * as React from 'react';
import {
	StyleSheet,
	ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import {
    changeLogin,
    changePassword,
    changeMail,
    changeName,
    changeUserDataAgreement,
    changeUserOfferAgreement,
} from '../redux/actions/register';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import CorrectKeyboardContainer from '../components/CorrectKeyboardContainer';
import { CustomButton } from '../components/CustomButton';
import { CustomLoader } from '../components/CustomLoader';
import { AppLogo } from '../components/AppLogo';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomError } from '../components/CustomError';
import ApiService from '../services/api-service';
import AlertService from '../services/alert-service';
import PlatformService from '../services/platform-service';

type Props = {
    login: string,
    password: string,
    name: string,
    mail: string,
    userDataAgreement: boolean,
    userOfferAgreement: boolean,
    actions: any,
    navigation: any,
};

class RegisterScreen extends React.Component<Props, any> {
	private api = ApiService;
	private alert = AlertService;
	private platform = PlatformService;

	constructor(props: Props) {
		super(props);

		this.state = { isLoading: false, error: '' };

		this.onRegister = this.onRegister.bind(this);
		this.changeLogin = this.changeLogin.bind(this);
		this.changePassword = this.changePassword.bind(this);
		this.changeName = this.changeName.bind(this);
		this.changeMail = this.changeMail.bind(this);
	}

	public get isButtonDisabled(): boolean {
		const { login, password, name, mail, userDataAgreement, userOfferAgreement } = this.props;
		if (!login || !password || !name || !mail || !userDataAgreement || !userOfferAgreement) {
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

	changeName(text: string): void {
		this.setState({ error: '' }, () => this.props.actions.changeName(text));
	}

	changeMail(text: string): void {
		this.setState({ error: '' }, () => this.props.actions.changeMail(text));
	}

	changeUserDataAgreement(value: boolean): void {
		this.props.actions.changeUserDataAgreement(value);
	}

	changeUserOfferAgreement(value: boolean): void {
		this.props.actions.changeUserOfferAgreement(value);
	}

	async onRegister() {
		if (this.isButtonDisabled) {
			return;
		}

		this.setState({ isLoading: true });
		try {
			await this.api.register(
				this.props.login,
				this.props.password,
				this.props.name,
				this.props.mail
			);
			this.setState({ isLoading: false });
			this.alert.alert('Успех', 'Вы успешно зарегистрировались в системе');
		}
		catch(err) {
			const errorResponse: any = err.response || {};
			const errorData: any = errorResponse.data || {};
			const errorText: string = errorData.detail || '';
			this.setState({ isLoading: false, error: errorText });
			this.alert.alert('Ошибка', 'Что-то пошло не так');
		}
	}

	login(): void {
		this.props.navigation.navigate('Login');
	}

	renderError() {
		if (!this.state.error) {
			return null;
		}

		return <CustomError error={this.state.error} />;
	}

	renderMain() {
		const { login, password, name, mail, userDataAgreement, userOfferAgreement } = this.props;

		return (
			<View style={[styles.container, { height: this.platform.height } ]}>
				<ImageBackground source={require('../assets/images/auth_bg.png')} resizeMode="cover" style={styles.image}>
					<AppLogo />

					<View style={{ marginTop: this.platform.height*.28 }} />

					<CustomTextInput
						labelText="Как вас зовут?"
						placeholderText="Как к вам можно обращаться?"
						isPassword={false}
						value={name}
						onChangeValue={this.changeName}
					/>
					<CustomTextInput
						labelText="Введите свою электронную почту"
						placeholderText="Она будет служить логином для входа"
						isPassword={false}
						value={mail}
						onChangeValue={this.changeMail}
					/>
					<CustomTextInput
						labelText="Придумайте имя пользователя"
						placeholderText="По нему вас будут узнавать телезрители"
						isPassword={false}
						value={login}
						onChangeValue={this.changeLogin}
					/>
					<CustomTextInput
						labelText="Придумайте пароль"
						placeholderText="Выберите надежный, но не забудьте его"
						isPassword={true}
						value={password}
						onChangeValue={this.changePassword}
					/>

					<BouncyCheckbox
						isChecked={userDataAgreement}
						size={17}
						fillColor="#0099cc"
						unfillColor="#FFFFFF"
						text="Обработка персональных данных"
						iconStyle={{ borderColor: '#0099cc', borderRadius: 5 }}
						textStyle={{ fontSize: 14 }}
						style={styles.checkbox}
						onPress={(isChecked: boolean) => this.changeUserDataAgreement(isChecked)}
					/>

					<BouncyCheckbox
						isChecked={userOfferAgreement}
						size={17}
						fillColor="#0099cc"
						unfillColor="#FFFFFF"
						text="Условия пользоввтельского соглашения"
						iconStyle={{ borderColor: '#0099cc', borderRadius: 5 }}
						textStyle={{ fontSize: 14 }}
						style={styles.checkbox1}
						onPress={(isChecked: boolean) => this.changeUserOfferAgreement(isChecked)}
					/>

					{ this.renderError() }

					<CustomButton
						buttonText="Создать аккаунт"
						isDisabled={this.isButtonDisabled}
						onButtonClick={this.onRegister}
					/>

					<View style={styles.bottom}>
						<View style={styles.haveAccount}>
							<Text onPress={() => this.login()} style={styles.haveAccountText}>Уже есть аккаунт?</Text>
						</View>
					</View>

					{ this.state.isLoading ? <CustomLoader /> : null }
				</ImageBackground>
			</View>
		);
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
	login: state.registerData.login,
	password: state.registerData.password,
	name: state.registerData.name,
	mail: state.registerData.mail,
	userDataAgreement: state.registerData.userDataAgreement,
	userOfferAgreement: state.registerData.userOfferAgreement,
});

const ActionCreators = Object.assign(
	{},
	{
		changeLogin,
		changePassword,
		changeName,
		changeMail,
		changeUserDataAgreement,
		changeUserOfferAgreement,
	}
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
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	bottom: {
		position: 'absolute',
		bottom: -10,
		left: 0,
		width: '100%',
		backgroundColor: 'transparent',
	},
	haveAccount: {
		backgroundColor: 'transparent',
		paddingBottom: 25
	},
	haveAccountText: {
		color: '#333',
		fontSize: 16,
		textAlign: 'center',
		backgroundColor: 'transparent',
		textDecorationLine: 'underline',
	},
	checkbox: {
		marginLeft: '15%',
		marginTop: 25,
		paddingRight: 25,
	},
	checkbox1: {
		marginLeft: '15%',
		marginTop: 5,
		paddingRight: 25,
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
