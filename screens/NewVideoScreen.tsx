import * as React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Camera } from 'expo-camera';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ScreenOrientation from 'expo-screen-orientation';
import { setVideoData } from '../redux/actions/newVideo';
import { View, Text } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import { AppLogo } from '../components/AppLogo';
import AlertService from '../services/alert-service';

function CameraComponent(props: any) {
	const [isRecording, setIsRecording] = React.useState<boolean>(false);
	const [cameraRef, setCameraRef] = React.useState<any>(null);

	const {
		hasPermissions = false,
	} = props;

	const onPress = async() => {
		if (!isRecording) {
			setIsRecording(true)
			let video = await cameraRef.recordAsync();
			console.log(video)
		}
		else {
			setIsRecording(false);
			cameraRef.stopRecording();
		}
	};

	if (!hasPermissions) {
		return (
			<View style={styles.banner}>
				<Text style={styles.bannerTitle}>
					Нет доступа к камере/микрофону
				</Text>
				<View style={styles.bannerDescription}>
					<Text style={styles.bannerDescriptionText}>
						Чтобы записать видео, разрешите приложению пользоваться кмерой и микрофоном в настройках телефона
					</Text>
				</View>
			</View>
		)
	}

	return (
		<Camera
			style={{ flex: 1 }}
			type={Camera.Constants.Type.back}
			ref={ref => setCameraRef(ref)}
		>
			<View style={styles.cameraViewContainer}>
				<View style={styles.cameraView}>
					<TouchableOpacity style={{alignSelf: 'center'}} onPress={onPress}>
						<View style={styles.recordButtonContainer}>
							<View style={styles.recordButton} />
						</View>
					</TouchableOpacity>
				</View>
			</View>
		</Camera>
	);
}

class NewVideoScreen extends React.Component<any, any> {

	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.startVideoClick = this.startVideoClick.bind(this);
		this.goBackClick = this.goBackClick.bind(this);
		this.onChangeOrientationListener = this.onChangeOrientationListener.bind(this);

		this.state = {
			isLandscape: false,
			isRecording: false,
			hasPermissions: false,
			showCamera: false,
		};
	}

	async componentDidMount() {
		await this.setPermissions();

		ScreenOrientation.addOrientationChangeListener(this.onChangeOrientationListener);
		await ScreenOrientation.unlockAsync();
	}

	async componentWillUnmount() {
		ScreenOrientation.removeOrientationChangeListeners();
		await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
	}

	async setPermissions() {
		const { status: cameraStatus = null } = await Camera.getCameraPermissionsAsync();
		const { status: microphoneStatus = null } = await Camera.getMicrophonePermissionsAsync();

		this.setState({ hasPermissions: microphoneStatus === 'granted' && cameraStatus === 'granted' });
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

	goBackClick() {
		this.props.navigation.navigate('Root');
	}

	startVideoClick() {
		this.setState({ showCamera: true });
	}

	renderBackLink() {
		if (this.state.isLandscape) {
			return null;
		}

		return (
			<Text onPress={this.goBackClick} style={styles.returnBack}>
				{"\<"}&nbsp;Вернуться
			</Text>
		);
	}

	renderStartRecordingButton() {
		if (!this.state.isLandscape) {
			return null;
		}

		return (
			<TouchableOpacity
				activeOpacity={0.5}
				onPress={this.startVideoClick}
				style={styles.startVideoButton}
			>
				<Image
					style={{ width: 100, height: 87.4 }}
					source={require('../assets/images/startvideo.png')}
				/>
			</TouchableOpacity>
		);
	}

	renderBanner() {
		if (this.state.isLandscape) {
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

	render() {
		const { hasPermissions = false, showCamera = false } = this.state;

		if (showCamera) {
			return (
				<CameraComponent
					hasPermissions={hasPermissions}
				/>
			);
		}

		return (
			<ImageBackground
				source={require('../assets/images/auth_bg.png')}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.container}>
					<AppLogo />
					{ this.renderBackLink() }
					{ this.renderStartRecordingButton() }
					{ this.renderBanner() }
				</View>
			</ImageBackground>
		);
	}
}

const mapStateToProps = (state: any) => ({
	video: state.newVideoData.videos,
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
		width: 100,
		height: 87.4,
		marginTop: 200
	},
	banner: {
		width: '90%',
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
	cameraViewContainer: {
		flex: 1,
		backgroundColor: 'transparent',
		justifyContent: 'flex-end'
	},
	cameraView: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		backgroundColor: 'transparent',
	},
	recordButtonContainer: {
		borderWidth: 2,
		borderRadius:25,
		borderColor: 'red',
		height: 50,
		width: 50,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 30,
		backgroundColor: 'transparent',
	},
	recordButton: {
		borderWidth: 2,
		borderRadius:25,
		borderColor: 'red',
		height: 40, width:40,
		backgroundColor: 'red',
	}
});

const extendedComponent = WithAuth(NewVideoScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
