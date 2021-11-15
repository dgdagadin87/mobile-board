import * as React from 'react';
import { ImageBackground, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { View, Text } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';
import { AppLogo } from '../components/AppLogo';
import AlertService from '../services/alert-service';


class NewVideoScreen extends React.Component<any> {

	private alert = AlertService;

	constructor(props: any) {
		super(props);

		this.startVideoClick = this.startVideoClick.bind(this);
		this.goBackClick = this.goBackClick.bind(this);
	}

	goBackClick() {
		this.props.navigation.navigate('Root');
	}

	startVideoClick() {
		this.alert.alert('', 'Запись видео началась!');
	}

	render() {
		return (
			<ImageBackground
				source={require('../assets/images/auth_bg.png')}
				resizeMode="cover"
				style={styles.image}
			>
				<View style={styles.container}>

					<AppLogo />

					<Text onPress={this.goBackClick} style={styles.returnBack}>
						{"\<"}&nbsp;Вернуться
					</Text>

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

					<View style={styles.banner}>
						<Text style={styles.bannerTitle}>
							чтобы записать видео нужно перевернуть устройство горизонтально
						</Text>
						<View style={styles.demoControl}>
							<View style={styles.demoControlInner} />
						</View>
						<View style={styles.bannerDescription}>
							<Text style={styles.bannerDescriptionText}>
								Нажмите кнопку сверху,{"\n"}когда будете готовы
							</Text>
						</View>
					</View>

				</View>
			</ImageBackground>
		);
	}
}

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
		marginTop: 30,
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
		marginTop: 20,
		marginLeft: 15
	}
});

const extendedComponent = WithAuth(NewVideoScreen);
export default extendedComponent;
