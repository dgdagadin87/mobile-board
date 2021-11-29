import * as React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setVideoData } from '../redux/actions/newVideo';
import { View, Text } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import WithScreenRotation from '../components/hocs/WithScreenRotation';

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

	constructor(props: any) {
		super(props);

		this.goBackClick = this.goBackClick.bind(this);
		this.onChangeOrientationListener = this.onChangeOrientationListener.bind(this);
		this.onStartVideoClick = this.onStartVideoClick.bind(this);
		this.onFlipClick = this.onFlipClick.bind(this);

		this.state = {
			isLandscape: false,
			isRecording: false,
			hasPermissions: false,
			onStopRecordingClicked: false,
			cameraType: Camera.Constants.Type.back
		};
	}

	async componentDidMount() {
		await this.setPermissions();

		ScreenOrientation.addOrientationChangeListener(this.onChangeOrientationListener);
	}

	async componentWillUnmount() {
		ScreenOrientation.removeOrientationChangeListeners();
	}

	async setPermissions() {
		const { status: cameraStatus = null } = await Camera.getCameraPermissionsAsync();
		const { status: microphoneStatus = null } = await Camera.getMicrophonePermissionsAsync();

		this.setState({ hasPermissions:/* microphoneStatus === 'granted' &&*/ cameraStatus === 'granted' });
	}

	onChangeOrientationListener(event: any = {}) {
		const { orientationInfo = {} } = event;
		const orientation: number = orientationInfo.orientation;
		const OrientationContainer = ScreenOrientation.Orientation;

		if ([OrientationContainer.LANDSCAPE_LEFT, OrientationContainer.LANDSCAPE_RIGHT].indexOf(orientation) !== -1) {
			this.setState({ isLandscape: true });
		}
		else {
			this.setState({ isLandscape: false });
		}
	}

	async onStartVideoClick() {

		if (!this.state.isRecording) {
			this.setState(
				{ isRecording: true },
				async () => {
					const video: any = await this.cameraRef.recordAsync();
					this.props.actions.setVideoData(video);
					setTimeout(() => this.props.navigation.navigate('SendAddedVideo'), 200);
				}
			);
		}
		else {
			this.setState(
				{ isRecording: false },
				async () => {
					this.cameraRef.stopRecording();
				}
			);
		}
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
			<Text onPress={this.goBackClick} style={styles.returnBack}>
				{"\<"}&nbsp;Вернуться
			</Text>
		);
	}

	renderBanner() {
		if (this.state.hasPermissions && this.state.isLandscape || !this.isVideoEmpty || this.state.isRecording) {
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
		if (!this.state.isLandscape) {
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
		if (!this.state.isLandscape || this.state.isRecording) {
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
		)
	}

	render() {
		const { hasPermissions = false } = this.state;

		if (!hasPermissions) {
			return (
				<View style={[styles.banner, { marginTop: 45 }]}>
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
				style={{ flex: 1 }}
				ratio={'16:9'}
				type={this.state.cameraType}
				ref={ref => this.cameraRef = ref}
			>
				{ this.renderBackLink() }
				{ this.renderBanner() }
				{ this.renderVideoButton() }
				{ this.renderFlipButton() }
			</Camera>
		);
	}
}

const mapStateToProps = (state: any) => ({
	video: state.newVideoData.video,
});

const ActionCreators = Object.assign(
	{},
	{ setVideoData }
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
	startVideoButton: {
		position: 'absolute',
		top: '50%',
		right: '15%'
	},
	banner: {
		width: '90%',
		marginLeft: '5%',
		backgroundColor: '#969692',
		borderRadius: 10,
		marginTop: 300,
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
	returnBack: {
		color: '#ffffff',
		textDecorationLine: 'underline',
		textAlign: 'left',
		width: '100%',
		marginTop: 45,
		marginLeft: 15
	},
	flipButton: {
		position: 'absolute',
		top: '55%',
		left: '15%',
		backgroundColor: '#fff',
		padding: 7,
		borderRadius: 5
	},
	flipText: {
		textTransform: 'uppercase',
		fontSize: 16,
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
