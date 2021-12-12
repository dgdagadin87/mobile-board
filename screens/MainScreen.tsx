import * as React from 'react';
import {
	ImageBackground,
	StyleSheet,
	ScrollView,
	Image,
	TouchableOpacity,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import { CustomLoader } from '../components/CustomLoader';
import WithAuth from '../components/hocs/WithAuth';
import { setUserData, setVideosList, setDescription } from '../redux/actions/main';
import { VideoItem } from '../redux/reducers/mainReducer';
import AuthService from '../services/auth-service';
import ApiService from '../services/api-service';
import AlertService from '../services/alert-service';
import PlatformService from '../services/platform-service';

const platform = PlatformService;

const getImageGabarites = (): { width: number, height: number } => {
	const width: number = (platform.width * .88) - 12;
	const height: number = width * .5625;

	return { width, height };
};
const gabarites: any = getImageGabarites();

const VideoComponent = function(props : any) {
	const isVideoEmpty = (): boolean => {
		return !props.cdn;
	}

	const renderVideo = () => {
		if (isVideoEmpty() || !props.cdn?.cdn_url) {
			return (
				<View style={[ gabarites, styles.videoPreview, styles.emptyVideoContainer ]}>
					<Text style={styles.emptyVideoText}>
						К сожалению, данное видео не было одобрено к публикации:( Поэтому мы очень ждём Ваши публикации!
					</Text>
				</View>
			);
		}

		const videoUrl: string = props.cdn?.cdn_url.indexOf('http') === -1 ? 'https://' + props.cdn?.cdn_url : props.cdn?.cdn_url;

		return (
			<VideoPlayer
				defaultControlsVisible={true}
				videoProps={{
					shouldPlay: false,
					resizeMode: Video.RESIZE_MODE_CONTAIN,
					source: { uri: videoUrl },
				}}
				style={{
					videoBackgroundColor: 'transparent',
					...gabarites
				}}
				fullscreen={{
					inFullscreen: true,
					enterFullscreen: async () => {},
					exitFullscreen: async () => {}
				}}
			/>
		);
	};

	const renderDetails = () => {
		return (
			<View style={styles.videoDetailsContainer}>
				<Text style={styles.videoName}>{ props.name }</Text>
				<FontAwesome
					name={ isVideoEmpty() ? 'times' : 'check' }
					size={35}
					color={ isVideoEmpty() ? 'red' : 'green' }
					style={{ position: 'absolute', top: -10, right: 0 }}
				/>
				<Text numberOfLines={2} style={{  marginTop: 5, color: '#666666' }}>
					{ props.description }
				</Text>
				<TouchableOpacity
					style={{ textAlign: 'right', width: '100%' }}
					onPress={() => props.onOpenModal(props.description)}
				>
					<Text style={{ marginTop: 5, textAlign: 'right', fontSize: 15, textDecorationLine: 'underline' }}>
						Подробнее&nbsp;
						<FontAwesome
							name={ 'arrow-right' }
							size={15}
							color={ '#000000' }
						/>
					</Text>
				</TouchableOpacity>
			</View>
		);
	};

	return (
		<View style={styles.videoItem}>
			{ renderVideo() }
			{ renderDetails() }
		</View>
	);
}

class MainScreen extends React.Component<any, any> {
	private api = ApiService;
	private auth = AuthService;
	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.state = { isLoading: false };

		props.navigation.addListener('focus', async () => await this.setVideos());

		this.onEditClick = this.onEditClick.bind(this);
		this.onNewVideoClick = this.onNewVideoClick.bind(this);
		this.onHelpClick = this.onHelpClick.bind(this);
		this.onShowDescription = this.onShowDescription.bind(this);
	}

	onShowDescription(description: string) {
		this.props.actions.setDescription(description);
		this.props.navigation.navigate('Description');
	}

	async componentDidMount(): Promise<void> {
		await this.setUserData();
		await this.setVideos();
	}

	async onHelpClick() {
		await this.auth.exit();
		this.props.navigation.navigate('Login');
		//this.alert.alert('Помощь', 'Это кнопка помощи');
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
		this.setState({ isLoading: true });
		try {
			const response: VideoItem[] = await this.api.getVideos();
			this.setState({ isLoading: false })
			this.props.actions.setVideosList(response);
		}
		catch(error) {
			await this.alert.alert('Ошибка', 'Что-то пошло не так');
			this.setState({ isLoading: false });
		}
	}

	renderEmptyVideoMessage() {
		if (this.state.isLoading) {
			return null;
		}

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
		if (this.state.isLoading) {
			return null;
		}

		const videoList = this.props.videos.map(
		(video: VideoItem, index: number) => {
				return (
					<VideoComponent
						key={index}
						{ ...video }
						onOpenModal={this.onShowDescription}
					/>
				);
			}
		);

		return (
			<View style={styles.listContainer}>{videoList}</View>
		);
	}

	render() {
		const {user = {}, videos = []} = this.props;

		return (
			<ImageBackground
				source={require('../assets/images/auth_bg.png')}
				resizeMode="cover"
				style={styles.image}
			>
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

				{ this.state.isLoading ? <CustomLoader /> : null }
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
	{ setUserData, setVideosList, setDescription }
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
		top: 175,
		left: 50,
		fontSize: 15,
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
	emptyVideoContainer: {
		backgroundColor: '#a8a8a8',
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyVideoText: {
		padding: 20,
		color: '#006587',
		textAlign: 'center',
		fontSize: 16,
		fontWeight: 'bold',
	},
	emptyPreview: {
		backgroundColor: '#000000',
		justifyContent: 'center',
		alignItems: 'center',
	},
	videoDetailsContainer: {
		marginTop: 15,
		backgroundColor: 'transparent',
		position: 'relative'
	},
	videoName: {
		paddingRight: '10%',
		color: 'white',
		fontSize: 18,
		fontWeight: 'bold',
		backgroundColor: 'transparent'
	},
	videoStatus: {
		position: 'absolute',
		top: 0,
		right: 0,
		width: '50%',
		textAlign: 'right',
	},
});

const extendedComponent = WithAuth(MainScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
