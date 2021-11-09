import * as React from 'react';
import {
    StyleSheet,
    TextInput,
    ImageBackground,
    Image,
    Dimensions,
} from 'react-native';
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { connect } from 'react-redux';
import {
    changeLogin,
    changePassword,
    changeMail,
    changeName,
    changeUserDataAgreement,
    changeUserOfferAgreement,
} from '../redux/actions/register';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import { CustomButton } from '../components/CustomButton';

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

class RegisterScreen extends React.Component<Props> {
	constructor(props: Props) {
		super(props);
		this.onRegister = this.onRegister.bind(this);
	}

	public get isButtonDisabled(): boolean {
		const { login, password, name, mail, userDataAgreement, userOfferAgreement } = this.props;
		if (!login || !password || !name || !mail || !userDataAgreement || !userOfferAgreement) {
			return true;
		}

		return false;
	}

	changeLogin(text: string) {
		this.props.actions.changeLogin(text);
	}

	changePassword(text: string) {
		this.props.actions.changePassword(text);
	}

	changeName(text: string): void {
		this.props.actions.changeName(text);
	}

	changeMail(text: string): void {
		this.props.actions.changeMail(text);
	}

	changeUserDataAgreement(value: boolean): void {
		this.props.actions.changeUserDataAgreement(value);
	}

	changeUserOfferAgreement(value: boolean): void {
		this.props.actions.changeUserOfferAgreement(value);
	}

	onRegister() {
		console.log('Register')
	}

	login(): void {
		this.props.navigation.navigate('Login');
	}

	render() {
		const { login, password, name, mail, userDataAgreement, userOfferAgreement } = this.props;

		return (
			<View style={styles.container}>
				<ImageBackground
				source={require('../assets/images/auth_bg.png')}
				resizeMode="cover"
				style={styles.image}
				>
				<Image
					style={styles.logo}
					source={require('../assets/images/logo.svg')}
				/>

				<Text style={styles.label}>Как вас зовут?</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text: string) => this.changeName(text)}
					value={name}
					placeholder="Как к вам можно обращаться?"
				/>

				<Text style={styles.label}>Введите свою электронную почту</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text: string) => this.changeMail(text)}
					value={mail}
					placeholder="Она будет служить логином для входа"
				/>

				<Text style={styles.label}>Придумайте имя пользователя</Text>
				<TextInput
					style={styles.input}
					onChangeText={(text: string) => this.changeLogin(text)}
					value={login}
					placeholder="По нему вас будут узнавать телезрители"
				/>

				<Text style={styles.label}>Придумайте пароль</Text>
				<TextInput
					secureTextEntry={true}
					style={styles.input}
					onChangeText={(text: string) => this.changePassword(text)}
					value={password}
					placeholder="Выберите надежный, но не забудте его"
				/>

				<BouncyCheckbox
					isChecked={userDataAgreement}
					size={17}
					fillColor="#0099cc"
					unfillColor="#FFFFFF"
					text="Обработка персональных данных"
					iconStyle={{ borderColor: '#0099cc', borderRadius: 5 }}
					textStyle={{ fontSize: 12,  }}
					style={styles.checkbox}
					onPress={(isChecked: boolean) => this.changeUserDataAgreement(isChecked)}
				/>

				<BouncyCheckbox
					isChecked={userOfferAgreement}
					size={17}
					fillColor="#0099cc"
					unfillColor="#FFFFFF"
					text="Услооия пользоввтельского соглашения"
					iconStyle={{ borderColor: '#0099cc', borderRadius: 5 }}
					textStyle={{ fontSize: 12,  }}
					style={styles.checkbox1}
					onPress={(isChecked: boolean) => this.changeUserOfferAgreement(isChecked)}
				/>

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
				</ImageBackground>
			</View>
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
	forgotLink: {
		textAlign: 'center',
		textDecorationLine: 'underline',
		fontSize: 12,
		paddingTop: 20,
		color: '#333',
	},
	bottom: {
		position: 'absolute',
		bottom: 0,
		left: 0,
		width: '100%',
		textAlign: 'center',
		backgroundColor: 'transparent',
		textDecorationLine: 'underline',
	},
	haveAccount: {
		backgroundColor: 'transparent',
		paddingBottom: 15
	},
	haveAccountText: {
		color: '#333',
		fontSize: 16,
		backgroundColor: 'transparent'
	},
	label: {
		marginLeft: '15%',
		color: '#333',
		fontSize: 14
	},
	input: {
		width: '70%',
		backgroundColor: '#fff',
		padding: 7,
		marginLeft: '15%',
		marginBottom: 10,
		marginTop: 5,
		fontSize: 12,
		borderWidth: 1,
		borderColor: '#999999',
		borderStyle: 'solid'
	},
	image: {
		flex: 1,
		justifyContent: "center",
		width: '100%',
		height: '100%'
	},
	logo: {
		position: 'absolute',
		top: '2%',
		left: '29%',
		width: '42%',
		height: Dimensions.get('window').width * .3,
		resizeMode: 'stretch'
	},
	button: {
		flexDirection: 'row', 
		height: 40, 
		backgroundColor: '#0099cc',
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 15,
		elevation:3,
		width: '70%',
		marginLeft: '15%'
	},
	text: {
		fontSize: 16,
		fontWeight: 'bold',
		color: '#fff'
	},
	checkbox: {
		marginLeft: '15%',
		marginTop: 25,
		paddingRight: '25',
	},
	checkbox1: {
		marginLeft: '15%',
		marginTop: 5,
		paddingRight: '25',
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);