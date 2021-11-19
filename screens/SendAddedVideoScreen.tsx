import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '../components/Themed';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';

import { Video } from 'expo-av'
import VideoPlayer from 'expo-video-player'
import {setVideoData} from "../redux/actions/newVideo";
import WithScreenRotation from "../components/hocs/WithScreenRotation";
import WithAuth from "../components/hocs/WithAuth";


class SendAddedVideoScreen extends React.Component<any, any> {
	render() {
		return (
			<View style={{ width: 300, height: 300 }}>
				<VideoPlayer
					videoProps={{
						shouldPlay: false,
						resizeMode: Video.RESIZE_MODE_CONTAIN,
						// ❗ source is required https://docs.expo.io/versions/latest/sdk/video/#props
						source: this.props.video,
					}}
					style={{ width: 300, height: 300 }}
					fullscreen={{
						inFullscreen: false,}}
				/>
			</View>

		);
	}
}

const mapStateToProps = (state: any) => ({
	video: state.newVideoData.video,
});

const ActionCreators = Object.assign(
	{},
);
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

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

export default connect(mapStateToProps, mapDispatchToProps)(SendAddedVideoScreen);
