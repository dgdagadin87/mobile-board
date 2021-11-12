import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
	Image,
	TouchableOpacity
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import { setUserData, setVideosList } from '../redux/actions/main';
import AuthService from '../services/auth-service';
import AlertService from '../services/alert-service';
import PlatformService from '../services/platform-service';

const platform = PlatformService;

class MainScreen extends React.Component<any> {

	private auth = AuthService;
	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.onEditClick = this.onEditClick.bind(this);
		this.onNewVideoClick = this.onNewVideoClick.bind(this);
	}

	async componentDidMount(): Promise<void> {
		await this.setUserData();
	}

	onNewVideoClick() {
		this.props.navigation.navigate('NewVideo');
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
					<Text
						onPress={this.onEditClick}
						style={styles.userDataName}
					>
						{user.username}&nbsp;&nbsp;&nbsp;
						<FontAwesome  name="edit" size={19} color={'white'} />
					</Text>
					<Text style={styles.userDataMail}>{user.email}</Text>
					<FontAwesome
						name="user"
						size={70}
						color={'white'}
						style={styles.userAvatar}
					/>
				</View>

				<View style={styles.newVideoBlock}>
					<View style={styles.newVideoLine}></View>
					<TouchableOpacity
						activeOpacity={0.99}
						onPress={this.onNewVideoClick}
						style={styles.newVideoContainer}
					>
						<Image
							style={styles.newVideoButton}
							source={require('../assets/images/cameraicon.png')}
						/>
					</TouchableOpacity>
				</View>
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
		backgroundColor: 'transparent',
		position: 'relative'
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
	},
	newVideoBlock: {
		marginTop: 150,
		position: 'relative',
		width: '100%'
	},
	newVideoLine: {
		height: 5,
		position: 'absolute',
		backgroundColor: 'white',
		width: '100%',
		zIndex: 1,
	},
	newVideoContainer: {
		position: 'absolute',
		top: -33,
		left: (platform.width*.5 - 35),
		width: 70,
		height: 70,
		zIndex: 2,
		backgroundColor: '#0099cc',
		borderColor: 'white',
		borderWidth: 5,
		borderRadius: 50,
		paddingTop: 13,
		paddingLeft: 10
	},
	newVideoButton: {
		zIndex: 3,
		width: 40,
		height: 30,
		resizeMode: 'stretch',
	}
});

const extendedComponent = WithAuth(MainScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
