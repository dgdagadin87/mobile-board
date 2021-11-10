import * as React from 'react';
import { StyleSheet } from 'react-native';
import { Text, View } from '../components/Themed';
import StorageService from '../services/storage-service';

export default class MainScreen extends React.Component {
	private storage = StorageService;

	constructor(props: any) {
		super(props);
		this.storage.getData('auth').then((data) => {console.log(data)});
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>Main screen</Text>
				<Text style={styles.linkText}>It is main screen</Text>
			</View>
		);
	}

}

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
});
