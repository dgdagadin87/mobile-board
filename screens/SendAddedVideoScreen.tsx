import * as React from 'react';
import { StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard
} from 'react-native';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { View } from '../components/Themed';
import { setVideoName, setVideoDescription } from '../redux/actions/newVideo';
import FileService from '../services/file-service';
import ApiService from '../services/api-service';
import WithAuth from '../components/hocs/WithAuth';
import { CustomTextInput } from '../components/CustomTextInput';
import { CustomButton } from '../components/CustomButton';

const DismissKeyboard = ({ children }: any) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

class SendAddedVideoScreen extends React.Component<any, any> {
    private api = ApiService;
    private file = FileService;

    constructor(props: any) {
        super(props);

        this.changeVideoName = this.changeVideoName.bind(this);
        this.changeVideoDescription = this.changeVideoDescription.bind(this);
        this.sendOnModeration = this.sendOnModeration.bind(this);
    }

    public get isButtonDisabled(): boolean {
        return !this.props.videoName || !this.props.videoDescription;
    }

    getDateString(): string {
        return '2020-04-30T00:00:00';
        const now: Date = new Date();
        return now.toLocaleDateString() + '-' + now.toTimeString();
    }

    async sendOnModeration(): Promise<void> {
        const dateParam: string = this.getDateString();
        //const fileParam: string = await this.file.getFileContent(this.props.video.uri);

        try {
            const response: any = await this.api.uploadVideo(this.props.videoName, this.props.videoDescription, dateParam, this.props.video.uri);
            console.log('RESP', response);
        }
        catch(err) {
            console.log('error111: ', err);
        }
    }

    changeVideoName(text: string) {
        this.props.actions.setVideoName(text);
    }

    changeVideoDescription(text: string) {
        this.props.actions.setVideoDescription(text);
    }

    renderVideoPlayer() {
        if (!this.props.video) {
            return null;
        }

        return (
            <View style={styles.video}>
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
            </View>
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
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomTextInput
                    isTextarea={true}
                    labelText="О чем рассказываете?"
                    placeholderText=""
                    isPassword={false}
                    value={this.props.videoDescription}
                    onChangeValue={this.changeVideoDescription}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomButton
                    customStyles={{ width: '100%', marginLeft: 0 }}
                    buttonText="Отправить на модерацию"
                    isDisabled={this.isButtonDisabled}
                    onButtonClick={this.sendOnModeration}
                />
            </View>
        );
    }

    render() {
        return (
            <DismissKeyboard>
              <View style={styles.container}>
                <ImageBackground
                    source={require('../assets/images/auth_bg.png')}
                    resizeMode="cover"
                    style={styles.image}
                >
                    { this.renderVideoPlayer() }
                    { this.renderForm() }
                </ImageBackground>
              </View>
            </DismissKeyboard>
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
      justifyContent: 'center',
    },
    image: {
       flex: 1,
       width: '100%',
       height: '100%'
    },
    video: {
        paddingTop: 50,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'transparent'
    },
    form: {
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        backgroundColor: 'transparent',
        width: '100%'
    }
});

const extendedComponent = compose(WithAuth)(SendAddedVideoScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
