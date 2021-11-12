import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import WithAuth from '../components/hocs/WithAuth';

class NewVideoScreen extends React.Component<any> {
	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.title}>It is new video</Text>
				<TouchableOpacity style={styles.link}>
					<Text style={styles.linkText}>Go to home screen!</Text>
				</TouchableOpacity>
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

const extendedComponent = WithAuth(NewVideoScreen);
export default extendedComponent;
