import * as React from 'react';
import { StyleSheet, SafeAreaView, Button, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { changeLogin, changePassword } from '../redux/actions/login';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';

type Props = {
  login: string,
  password: string,
  actions: any,
};

class LoginScreen extends React.Component<Props> {
  changeLogin(text: string) {
    this.props.actions.changeLogin(text);
  }

  render() {
    const { login, password } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <Text>Введите почту</Text>
        <View>
          <TextInput
            editable={true}
            style={styles.input}
            onChangeText={(text: string) => this.changeLogin(text)}
            value={login}
          />
        </View>
        <Text></Text>
        <View></View>
      </SafeAreaView>
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
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
  input: {}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);