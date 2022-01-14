import * as React from 'react';
import {StyleSheet, ImageBackground, Image} from 'react-native';
import platform from '../services/platform-service';

import { Text, View } from '../components/Themed';

export default function ThanksScreen(props: any) {
	return (
		<ImageBackground
			source={require('../assets/images/auth_bg.png')}
			resizeMode="cover"
			style={styles.image}
		>
			<Text
				onPress={() => props.navigation.navigate('Root')}
				style={styles.returnBack}
			>
				{"\<"}&nbsp;Вернуться
			</Text>
			<View style={styles.emptyContainer}>
				<Image
					style={styles.emptyImage}
					source={require('../assets/images/cometicon.png')}
				/>
				<Text style={styles.emptyTitle}>
					Отправили ваше видео в редакцию. Спасибо!
				</Text>
				<Text style={styles.emptyDescription}>
					Ждите новостей ;)
				</Text>
			</View>
		</ImageBackground>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingTop: 40
	},
	image: {
		flex: 1,
		width: '100%',
		height: '100%',
	},
	returnBack: {
		color: '#ffffff',
		textDecorationLine: 'underline',
		textAlign: 'left',
		width: '100%',
		marginTop: 45,
		marginLeft: 15,
		fontSize: 15,
	},
	emptyContainer: {
		position: 'relative',
		marginTop: 105,
		paddingBottom: 15,
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
		fontSize: 30,
		fontWeight: 'bold',
		marginTop: 85,
		textAlign: 'center',
		color: '#006587',
	},
	emptyDescription: {
		fontSize: 18,
		marginTop: 15,
		marginBottom: 15,
		textAlign: 'center',
		color: 'grey',
	},
});
