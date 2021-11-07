import * as React from 'react';
import {
  StyleSheet,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { changeLogin, changePassword } from '../redux/actions/login';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';

type Props = {
  login: string,
  password: string,
  actions: any,
  navigation: any,
};

class LoginScreen extends React.Component<Props> {
  changeLogin(text: string) {
    this.props.actions.changeLogin(text);
  }

  changePassword(text: string) {
    this.props.actions.changePassword(text);
  }

  onLogin() {
    console.log('Login')
  }

  register(): void {
    this.props.navigation.navigate('Register');
  }

  render() {
    const { login, password } = this.props;

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
          <Text style={styles.label}>Введите почту</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text: string) => this.changeLogin(text)}
            value={login}
            placeholder="Она будет служить логином для входа"
          />
          <Text style={styles.label}>Введите пароль</Text>
          <TextInput
            secureTextEntry={true}
            style={styles.input}
            onChangeText={(text: string) => this.changePassword(text)}
            value={password}
            placeholder="По нему вас будут узнавать телезрители"
          />
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.button}
            onPress={this.onLogin}
          >
              <Text style={styles.text}>Войти</Text>
          </TouchableOpacity>

          <Text style={styles.forgotLink}>Забыли пароль?</Text>

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
        </ImageBackground>
      </View>
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
  haveNoAccount: {
    backgroundColor: 'transparent',
    paddingBottom: 15
  },
  haveNoAccountText: {
    color: '#333',
    fontSize: 16,
    backgroundColor: 'transparent'
  },
  userAgreement: {
    backgroundColor: 'transparent',
    paddingBottom: 15
  },
  userAgreementText: {
    color: '#333',
    fontSize: 12,
    backgroundColor: 'transparent'
  },
  publicOffert: {
    backgroundColor: 'transparent',
    paddingBottom: 25
  },
  publicOffertText: {
    color: '#333',
    fontSize: 12,
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
    border: '1px solid #999'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '100%'
  },
  logo: {
    position: 'absolute',
    top: '3%',
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
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);