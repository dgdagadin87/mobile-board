import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import { setUserData, setVideosList } from '../redux/actions/main';
import AuthService from '../services/auth-service';
import AlertService from '../services/alert-service';

class MainScreen extends React.Component<any> {

	private auth = AuthService;
	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.onEditClick = this.onEditClick.bind(this);
	}

	async componentDidMount(): Promise<void> {
		await this.setUserData();
	}

	onEditClick() {
		this.alert.alert('Редактирование профиля', 'Свяжитесь с поддержкой по номеру ... или электронной почте .....');
	}

	async setUserData(): Promise<void> {
		const userData: any = await this.auth.getUserData();
		this.props.actions.setUserData(userData);
	}

	render() {
		const {user = {}, videos = []} = this.props;

		return (
			<ImageBackground source={require('../assets/images/auth_bg.png')} resizeMode="cover" style={styles.image}>
				<View style={styles.userData}>
					<Text style={styles.userDataName}>
						{user.username}&nbsp;&nbsp;&nbsp;
						<FontAwesome onPress={this.onEditClick} name="edit" size={19} color={'white'} />
					</Text>
					<Text style={styles.userDataMail}>{user.email}</Text>
				</View>
				<FontAwesome
					name="user"
					size={70}
					color={'white'}
					style={styles.userAvatar}
				/>
			</ImageBackground>
		);
	}

}

const mapStateToProps = (state: any) => ({
	user: state.mainData.user,
	videos: state.mainData.videos,
});

const ActionCreators = Object.assign(
	{},
	{ setUserData, setVideosList }
);
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
	container: {
		paddingTop: 40
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	userData: {
		backgroundColor: 'transparent'
	},
	userDataName: {
		position: 'absolute',
		top: 55,
		left: 125,
		fontSize: 19,
		fontWeight: 'bold',
		color: 'white',
		backgroundColor: 'transparent'
	},
	userDataMail: {
		backgroundColor: 'transparent',
		position: 'absolute',
		top: 80,
		left: 125,
		fontSize: 14,
		color: 'white',
	},
	userAvatar: {
		position: 'absolute',
		top: 40,
		left: 50,
	}
});

const extendedComponent = WithAuth(MainScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
