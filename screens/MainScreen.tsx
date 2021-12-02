import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import { setUserData, setVideosList } from '../redux/actions/main';
import { VideoItem, VideoCdn } from '../redux/reducers/mainReducer';
import AuthService from '../services/auth-service';
import ApiService from '../services/api-service';
import AlertService from '../services/alert-service';
import PlatformService from '../services/platform-service';

const platform = PlatformService;

const getImageGabarites = (): { width: number, height: number } => {
	const width: number = (platform.width * .88) - 12;
	const height: number = width * .5625;

	return { width, height };
}
const gabarites = getImageGabarites();

const VideoComponent = function(props : VideoItem) {
	const isVideoEmpty = (): boolean => {
		return !props.cdn;
	}

	const onWatchClick = async (): Promise<void> => {
		if (isVideoEmpty() || !props.cdn?.cdn_url) {
			return;
		}
		await WebBrowser.openBrowserAsync('https://' + props.cdn?.cdn_url);
	}

	const getPreview = (): string => {
		if (isVideoEmpty()) {
			return '';
		}
		const previews: string[] = props.cdn && props.cdn.previews || [];
		const result: string = previews[0];

		if (!result) {
			return '';
		}

		return result.indexOf('http') === -1 ? 'https://' + result : result;
	}

	const renderPlayButton = () => {
		return (
			<FontAwesome
				onPress={onWatchClick}
				name="play"
				size={70}
				color={'red'}
				style={styles.videoPlay}
			/>
		);
	}

	const renderVideo = () => {
		if (isVideoEmpty()) {
			return (
				<View
					style={
						[
							gabarites,
							styles.videoPreview,
							{
								backgroundColor: '#a8a8a8',
								justifyContent: 'center',
								alignItems: 'center',
							}
						]
					}
				>
					<Text style={{
						padding: 20,
						color: '#006587',
						textAlign: 'center',
						fontSize: 16,
						fontWeight: 'bold',
					}}>
						К сожалению, данное видео не было одобрено к публикации:( Поэтому мы очень ждём Ваши публикации!
					</Text>
				</View>
			);
		}

		const preview: string = getPreview();

		if (!preview) {
			return (
				<>
					{ renderPlayButton() }
					<View style={
						[
							gabarites,
							styles.videoPreview,
							{
								backgroundColor: '#000000',
								justifyContent: 'center',
								alignItems: 'center',
							}
						]
					} />
				</>
			);
		}

		return (
			<>
				{ renderPlayButton() }
				<Image
					style={ [gabarites, styles.videoPreview] }
					source={{ uri: preview }}
				/>
			</>

		);
	}

	return (
		<View style={styles.videoItem}>
			{ renderVideo() }
		</View>
	);
}

class MainScreen extends React.Component<any> {
	private api = ApiService;
	private auth = AuthService;
	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.onEditClick = this.onEditClick.bind(this);
		this.onNewVideoClick = this.onNewVideoClick.bind(this);
		this.onHelpClick = this.onHelpClick.bind(this);
	}

	async componentDidMount(): Promise<void> {
		await this.setUserData();
		await this.setVideos();
	}

	onHelpClick() {
		this.alert.alert('Помощь', 'Это кнопка помощи');
	}

	onNewVideoClick() {
		this.props.navigation.navigate('NewVideo');
	}

	onEditClick() {
		this.alert.alert(
			'Редактирование профиля',
			'Свяжитесь с поддержкой по номеру ... или электронной почте .....'
		);
	}

	async setUserData(): Promise<void> {
		const userData: any = await this.auth.getUserData();
		this.props.actions.setUserData(userData);
	}

	async setVideos(): Promise<void> {
		try {
			const response: VideoItem[] = await this.api.getVideos();
			this.props.actions.setVideosList(response);
		}
		catch(error) {
			this.alert.alert('Ошибка', 'Что-то пошло не так');
		}
	}

	renderEmptyVideoMessage() {
		return (
			<View style={styles.emptyContainer}>
				<Image
					style={styles.emptyImage}
					source={require('../assets/images/novideoicon.png')}
				/>
				<Text style={styles.emptyTitle}>
					Кажется, у вас нет ни{"\n"}одного видео!
				</Text>
				<Text style={styles.emptyDescription}>
					Скорее же запишите его с помощью большой кнопки с камерой на вашем экране и отправьте нам в редакцию.{"\n\n"}Мы с удовольствием посмотрим!
				</Text>
			</View>
		);
	}

	renderVideoList() {
		const videoList = this.props.videos.map(
			(video: VideoItem, index: number) => <VideoComponent key={index} { ...video } />
		);

		return (
			<View style={styles.listContainer}>{videoList}</View>
		);
	}

	render() {
		const {user = {}, videos = []} = this.props;

		return (
			<ImageBackground source={require('../assets/images/auth_bg.png')} resizeMode="cover" style={styles.image}>
				<ScrollView>
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

					<FontAwesome
						onPress={this.onHelpClick}
						name="question-circle"
						size={25}
						color={'white'}
						style={styles.helpIcon}
					/>
					<Text onPress={this.onHelpClick} style={styles.helpText}>Помощь</Text>

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

					{ videos.length < 1 ? this.renderEmptyVideoMessage() : this.renderVideoList() }
				</ScrollView>
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
	helpIcon: {
		position: 'absolute',
		top: 174,
		left: 25,
	},
	helpText: {
		position: 'absolute',
		top: 179,
		left: 50,
		fontSize: 12,
		textDecorationLine: 'underline',
		color: 'white',
	},
	newVideoBlock: {
		marginTop: 120,
		position: 'relative',
		width: '100%',
		backgroundColor: 'transparent',
	},
	newVideoLine: {
		height: 5,
		position: 'absolute',
		top: 35,
		backgroundColor: 'white',
		width: '100%',
		zIndex: 1,
	},
	newVideoContainer: {
		width: 70,
		height: 70,
		zIndex: 2,
		marginLeft: (platform.width*.5 - 35),
		backgroundColor: '#0099cc',
		borderColor: 'white',
		borderWidth: 5,
		borderRadius: 50,
		paddingTop: 13,
		paddingLeft: 10
	},
	newVideoButton: {
		width: 40,
		height: 30,
		resizeMode: 'stretch',
	},
	emptyContainer: {
		position: 'relative',
		marginTop: 105,
		width: '90%',
		marginLeft: '5%',
        height: 250,
		backgroundColor: '#Bdd2d8',
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	emptyImage: {
		position: 'absolute',
		top: 10,
		left: (platform.width * .45 - 25),
		width: 50,
		height: 60,
		resizeMode: 'stretch',
	},
	emptyTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 85,
		textAlign: 'center',
        color: 'white',
	},
	emptyDescription: {
		fontSize: 12,
		marginTop: 15,
		textAlign: 'center',
		color: 'grey',
	},
	listContainer: {
		backgroundColor: 'transparent',
		marginTop: 45,
	},
	videoItem: {
		padding: 5,
		borderRadius: 5,
		backgroundColor: '#Bdd2d8',
		borderColor: '#9eb0b5',
		borderWidth: 1,
		width: platform.width * .88,
		marginLeft: '6%',
		marginBottom: 15,
		position: 'relative'
	},
	videoItemText: {
		backgroundColor: 'transparent',
	},
	videoPreview: {
		resizeMode: 'cover',
		borderRadius: 5,
		borderColor: '#9eb0b5',
		borderWidth: 1,

	},
	videoPlay: {
		position: 'absolute',
		color: 'red',
		top: ((gabarites.height / 2) - 29),
		left: ((gabarites.width / 2) - 25),
		zIndex: 2,
	},
});

const extendedComponent = WithAuth(MainScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
