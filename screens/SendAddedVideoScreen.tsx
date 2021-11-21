import * as React from 'react';
import { StyleSheet, ImageBackground } from 'react-native';
import { View } from '../components/Themed';
import { connect } from 'react-redux';
import { bindActionCreators, compose } from 'redux';
import { setVideoName, setVideoDescription } from '../redux/actions/newVideo';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import WithKeyboardDismiss from "../components/hocs/WithKeyboardDismiss";
import WithAuth from "../components/hocs/WithAuth";
import { CustomTextInput } from '../components/CustomTextInput';


class SendAddedVideoScreen extends React.Component<any, any> {

  constructor(props: any) {
    super(props);

    this.changeVideoName = this.changeVideoName.bind(this);
  }

  changeVideoName(text: string) {
		this.props.actions.setVideoName(text);
  }
  
  changeVideoDescription(text: string) {
		this.props.actions.setVideoDescription(text);
	}

  renderVideoPlayer() {
      return (
        <VideoPlayer
          videoProps={{
            shouldPlay: false,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: this.props.video.uri,
            },
          }}
          style={{
            videoBackgroundColor: 'transparent',
            height: 250,
          }}
        />
      );
  }

  renderForm() {
    return (
      <View style={styles.form}>
          <CustomTextInput
						labelText="Как назовете?"
						placeholderText="Название для видео"
						isPassword={false}
						value={this.props.videoName}
						onChangeValue={this.changeVideoName}
					/>
      </View>
    );
  }

	render() {
		return (
        <ImageBackground
          source={require('../assets/images/auth_bg.png')}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.container}>
              { this.renderVideoPlayer() }
              { this.renderForm() }
          </View>
        </ImageBackground>

		);
	}
}

const mapStateToProps = (state: any) => ({
  video: state.newVideoData.video,
  videoName: state.newVideoData.videoName,
  videoDescription: state.newVideoData.videoDescription,
});

const ActionCreators = Object.assign(
  {},
  { setVideoName, setVideoDescription }
);
const mapDispatchToProps = (dispatch: any) => ({
	actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
  container: {
		flex: 1,
		alignItems: 'center',
    backgroundColor: 'transparent',
    paddingTop: 50,
    paddingLeft: 10,
    paddingRight: 10,
	},
	image: {
		flex: 1,
		justifyContent: "center",
		width: '100%',
		height: '100%'
  },
  video: {

  },
  form: {
    marginTop: 30
  }
});

const extendedComponent = compose(WithKeyboardDismiss, WithAuth)(SendAddedVideoScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
