import * as React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setVideoData, setEmptyAddVideoForm } from '../redux/actions/newVideo';
import { View, Text } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import WithScreenRotation from '../components/hocs/WithScreenRotation';
import FileService from '../services/file-service';

const VIDEO_LIMIT_SEC: number = 59;
const PREPARE_TIME_SEC: number = 3;

const VideoTimer = (props: any) => {
	const [seconds, setSeconds] = React.useState(1);
	const { isRecording = true } = props;

	React.useEffect(() => {
		let interval: any = null;
		if (isRecording) {
			interval = setInterval(() => {
				setSeconds(seconds => seconds + 1);
			}, 1000);
		}
		else if (!isRecording && seconds !== 1) {
			clearInterval(interval);
		}
		return () => clearInterval(interval);
	}, [seconds]);

	return (
		<View style={styles.timerView}>
			<Text style={styles.timerText}>
				{seconds}
			</Text>
		</View>
	);
};

class NewVideoScreen extends React.Component<any, any> {
	private cameraRef: any = null;
	private prepareInterval: any = null;

	private file = FileService;

	constructor(props: any) {
		super(props);

		props.navigation.addListener('focus', async () => {
			await this.deleteVideoIfExists();
		});

		this.goBackClick = this.goBackClick.bind(this);
		this.onChangeOrientationListener = this.onChangeOrientationListener.bind(this);
		this.onStartVideoClick = this.onStartVideoClick.bind(this);
		this.onFlipClick = this.onFlipClick.bind(this);

		this.state = {
			isLandscape: false,
			isRecording: false,
			isPreparing: false,
			hasPermissions: false,
			onStopRecordingClicked: false,
			cameraType: Camera.Constants.Type.back,
			preparingTime: PREPARE_TIME_SEC,
		};
	}

	async componentDidMount() {
		await this.setPermissions();
		await this.onChangeOrientationListener();

		ScreenOrientation.addOrientationChangeListener(this.onChangeOrientationListener);
	}

	async componentWillUnmount() {
		ScreenOrientation.removeOrientationChangeListeners();
	}

	async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>) {
		const prevIsPreparing: boolean = prevState.isPreparing;
		const currIsPreparing: boolean = this.state.isPreparing;

		if (prevIsPreparing && !currIsPreparing) {
			await this.startVideoRecording();
		}
	}

	deleteVideoIfExists(): void {
		if (this.isVideoEmpty) {
			return;
		}
		// TODO await this.file.deleteFile(this.props.video.uri);
		this.props.actions.setVideoData({});
	}

	async setPermissions() {
		const { status: cameraStatus = null } = await Camera.getCameraPermissionsAsync();
		const { status: microphoneStatus = null } = await Camera.getMicrophonePermissionsAsync();

		this.setState({ hasPermissions: microphoneStatus === 'granted' && cameraStatus === 'granted' });
	}

	async onChangeOrientationListener(event: any = {}) {
		const OrientationContainer = ScreenOrientation.Orientation;
		let orientation: number = 0;
		if (!!event) {
			const { orientationInfo = {} } = event;
			orientation = orientationInfo.orientation;
		}
		else {
			orientation = await ScreenOrientation.getOrientationAsync();
		}

		if ([OrientationContainer.LANDSCAPE_LEFT, OrientationContainer.LANDSCAPE_RIGHT].indexOf(orientation) !== -1) {
			this.setState({ isLandscape: true });
		}
		else {
			this.setState({ isLandscape: false });
		}
	}

	stopVideoRecording () {
		this.setState(
			{ isRecording: false },
			() => {
				this.cameraRef.stopRecording();
			}
		);
	};

	async startVideoRecording() {
		if (!this.state.isRecording) {
			setTimeout(() => {
				if (this.state.isRecording) {
					this.stopVideoRecording();
				}
			}, VIDEO_LIMIT_SEC * 1000);
			this.setState(
				{ isRecording: true },
				async () => {
					const video: any = await this.cameraRef.recordAsync();
					this.props.actions.setVideoData(video);
					this.props.actions.setEmptyAddVideoForm();
					setTimeout(() => this.props.navigation.navigate('SendAddedVideo'), 2500);
				}
			);
		}
	}

	async onStartVideoClick() {
		if (this.state.isRecording) {
			this.stopVideoRecording();
			return;
		}

		this.setState({ isPreparing: true });

		this.prepareInterval = setInterval(() => {
			this.setState(
				{ preparingTime: (this.state.preparingTime - 1) },
				() => {
					if (this.state.preparingTime === 0) {
						this.setState(
							{ isPreparing: false },
							() => clearInterval(this.prepareInterval)
						);
					}
				}
			);
		}, 1000);
	};

	goBackClick() {
		this.props.navigation.navigate('Root');
	}

	onFlipClick() {
		const types: any = Camera.Constants.Type;
		this.setState({ cameraType: this.state.cameraType === types.back ? types.front : types.back })
	}

	get isVideoEmpty(): boolean {
		if (!this.props.video || !this.props.video.hasOwnProperty('uri')) {
			return true;
		}

		return false;
	}

	renderBackLink() {
		return (
			<TouchableOpacity
				onPress={this.goBackClick}
				style={styles.returnBackContainer}
			>
				<Text style={styles.returnBack}>
					{"\<"}&nbsp;Вернуться
				</Text>
			</TouchableOpacity>
		);
	}

	renderBanner() {
		if (this.state.isLandscape || this.state.isRecording || this.state.isPreparing) {
			return null;
		}

		return (
			<View style={styles.banner}>
				<Text style={styles.bannerTitle}>
					чтобы записать видео нужно перевернуть устройство горизонтально
				</Text>
				<View style={styles.demoControl}>
					<View style={styles.demoControlInner} />
				</View>
				<View style={styles.bannerDescription}>
					<Text style={styles.bannerDescriptionText}>
						Нажмите кнопку, которая появится на экране после поворота,{"\n"}когда будете готовы
					</Text>
				</View>
			</View>
		);
	}

	renderVideoButton() {
		if (!this.state.isLandscape || this.state.isPreparing) {
			return null;
		}

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.onStartVideoClick}
				style={styles.startVideoButton}
			>
				<Image
					style={{ width: 100, height: 87.4 }}
					source={require('../assets/images/startvideo.png')}
				/>
				{ this.state.isRecording ? <VideoTimer isRecording={this.state.isRecording} /> : null }
			</TouchableOpacity>
		);
	}

	renderFlipButton() {
		if (!this.state.isLandscape || this.state.isRecording || this.state.isPreparing) {
			return null;
		}

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.onFlipClick}
				style={styles.flipButton}
			>
				<Text style={styles.flipText}>
					Поменять камеру
				</Text>
			</TouchableOpacity>
		);
	}

	renderPreparingTime() {
		if (!this.state.isPreparing) {
			return null;
		}

		return (
			<View style={{backgroundColor: 'transparent', alignSelf: 'center',}}>
				<Text style={{color: 'red', fontSize: 100, backgroundColor: 'transparent'}}>{this.state.preparingTime}</Text>
			</View>
		);
	}

	render() {
		const { hasPermissions = false } = this.state;

		if (!hasPermissions) {
			return (
				<View style={[styles.banner]}>
					<Text style={styles.bannerTitle}>
						Нет доступа к камере/микрофону
					</Text>
					<View style={styles.bannerDescription}>
						<Text style={styles.bannerDescriptionText}>
							Чтобы записать видео, разрешите приложению пользоваться кмерой и микрофоном в настройках телефона
						</Text>
					</View>
				</View>
			);
		}

		return (
			<Camera
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'center'
				}}
				ratio={'16:9'}
				type={this.state.cameraType}
				ref={ref => this.cameraRef = ref}
			>
				{ this.renderBackLink() }
				{ this.renderBanner() }
				{ this.renderVideoButton() }
				{ this.renderFlipButton() }
				{ this.renderPreparingTime() }
			</Camera>
		);
	}
}

const mapStateToProps = (state: any) => ({
	video: state.newVideoData.video,
});

const ActionCreators = Object.assign(
	{},
	{ setVideoData, setEmptyAddVideoForm }
);
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'transparent'
	},
	image: {
		flex: 1,
		justifyContent: "center",
		width: '100%',
		height: '100%'
	},
	banner: {
		width: '90%',
		backgroundColor: '#969692',
		borderRadius: 10,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	bannerTitle: {
		marginLeft: 10,
		marginRight: 10,
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
		textAlign: 'center',
		color: 'white',
		textTransform: 'uppercase',
	},
	demoControl: {
		backgroundColor: 'transparent',
		borderTopColor: '#ffffff',
		borderTopWidth: 2,
		borderBottomColor: '#ffffff',
		borderBottomWidth: 2,
		marginTop: 15,
		padding: 10,
		width: '30%',
		marginLeft: '35%'
	},
	demoControlInner: {
		margin: 'auto',
		width: '90%',
		height: 20,
		backgroundColor: '#ffffff'
	},
	bannerDescription: {
		marginTop: 20,
		backgroundColor: 'transparent',
		marginBottom: 10

	},
	bannerDescriptionText: {
		fontSize: 16,
		color: '#ffffff',
		textAlign: 'center',
	},
	returnBackContainer: {
		backgroundColor: 'transparent',
		alignSelf: 'flex-start',
		position: 'absolute',
		top: 45,
		left: 15,
	},
	returnBack: {
		color: '#ffffff',
		textDecorationLine: 'underline',
		textAlign: 'left',
		width: '100%',

	},
	flipButton: {
		position: 'absolute',
		top: '15%',
		right: '3%',
		backgroundColor: '#fff',
		padding: 7,
		borderRadius: 5
	},
	flipText: {
		textTransform: 'uppercase',
		fontSize: 16,
	},
	startVideoButton: {
		position: 'absolute',
		top: '70%',
		right: '3%'
	},
	timerView: {
		position: 'absolute',
		top: '33%',
		right: '-40%',
		width: 100,
		height: 87.4,
		backgroundColor: 'transparent',
	},
	timerText: {
		fontSize: 35,
		color: 'red',
		fontWeight: 'bold',
		backgroundColor: 'transparent',
		zIndex: 11
	}
});

const extendedComponent = compose(WithScreenRotation, WithAuth)(NewVideoScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
