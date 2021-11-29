import * as React from 'react';
import {
    StyleSheet,
    ImageBackground,
    TouchableWithoutFeedback,
    Keyboard,
    ScrollView,
} from 'react-native';
import { bindActionCreators, compose } from 'redux';
import { connect } from 'react-redux';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';
import { View } from '../components/Themed';
import {
    setVideoName,
    setVideoDescription,
    setFilmName,
    setEfirDate,
    setActivityType,
    setCountryCityFrom,
} from '../redux/actions/newVideo';
import ApiService from '../services/api-service';
import AlertService from '../services/alert-service';
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
    private alert = AlertService;

    constructor(props: any) {
        super(props);

        this.changeVideoName = this.changeVideoName.bind(this);
        this.changeVideoDescription = this.changeVideoDescription.bind(this);
        this.changeFilmName = this.changeFilmName.bind(this);
        this.changeEfirDate = this.changeEfirDate.bind(this);
        this.changeCountryCityFrom = this.changeCountryCityFrom.bind(this);
        this.changeActivityType = this.changeActivityType.bind(this);
        this.sendOnModeration = this.sendOnModeration.bind(this);
    }

    get fullDescription(): string {
        const {
            filmName = '',
            efirDate = '',
            videoDescription = '',
            countryCityFrom = '',
            activityType = ''
        } = this.props;

        return filmName + ', ' + efirDate + ', ' + videoDescription + ',' + countryCityFrom + ', ' + activityType;
    }

    get isButtonDisabled(): boolean {
        return !this.props.videoName ||
               !this.props.videoDescription ||
               !this.props.filmName ||
               !this.props.efirDate ||
               !this.props.countryCityFrom ||
               !this.props.activityType;
    }

    getCorrectDateValue(value: string): string {
        return value.length > 1 ? value : '0' + value;
    }

    getDateString(): string {
        const now: Date = new Date();
        const year: string = now.getFullYear().toString();
        const month: string = this.getCorrectDateValue((now.getMonth() + 1).toString());
        const day: string = this.getCorrectDateValue(now.getDate().toString());
        const hours: string = this.getCorrectDateValue(now.getHours().toString());
        const minutes: string = this.getCorrectDateValue(now.getMinutes().toString());
        const seconds: string = '00';
        return year + '-' + month + '-' + day + 'T' + hours + ':' + minutes + ':' + seconds;
    }

    async sendOnModeration(): Promise<void> {
        if (this.isButtonDisabled) {
            this.alert.alert('Ошибка', 'Все поля обязательные');
            return;
        }

        const dateParam: string = this.getDateString();

        try {
            const response: any = await this.api.uploadVideo(this.props.videoName, this.fullDescription, dateParam, this.props.video.uri);
            if (response.success) {
                this.alert.alert('Успех', 'Видео успешно отправлено на модерацию');
            }
        }
        catch(err) {
            this.alert.alert('Ошибка', 'При отправке видео возникла ошибка');
        }
    }

    changeVideoName(text: string) {
        this.props.actions.setVideoName(text);
    }

    changeFilmName(text: string) {
        this.props.actions.setFilmName(text);
    }

    changeEfirDate(text: string) {
        this.props.actions.setEfirDate(text);
    }

    changeCountryCityFrom(text: string) {
        this.props.actions.setCountryCityFrom(text);
    }

    changeActivityType(text: string) {
        this.props.actions.setActivityType(text);
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
                    numOfStrings={2}
                    labelText="Название сериала, фильма, программы, о котором рассказываете"
                    placeholderText="Пожалуйста, укажите название или номер серии, если описываете сериал"
                    isPassword={false}
                    value={this.props.filmName}
                    onChangeValue={this.changeFilmName}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomTextInput
                    inputMask="99.99.9999"
                    labelText="Дата эфира"
                    placeholderText="дд.мм.гггг"
                    isPassword={false}
                    value={this.props.efirDate}
                    onChangeValue={this.changeEfirDate}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomTextInput
                    isTextarea={true}
                    numOfStrings={5}
                    labelText="О чем рассказываете?"
                    placeholderText=""
                    isPassword={false}
                    value={this.props.videoDescription}
                    onChangeValue={this.changeVideoDescription}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomTextInput
                    labelText="Откуда вы?"
                    placeholderText="Страна, город"
                    isPassword={false}
                    value={this.props.countryCityFrom}
                    onChangeValue={this.changeCountryCityFrom}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomTextInput
                    labelText="Укажите Ваш род деятельности"
                    placeholderText="Кассир, бухгалтер, домохозяйка"
                    isPassword={false}
                    value={this.props.activityType}
                    onChangeValue={this.changeActivityType}
                    customLabelStyles={{ marginLeft: 0 }}
                    customInputStyles={{ marginLeft: 0, width: '100%' }}
                />
                <CustomButton
                    customStyles={{ width: '100%', marginLeft: 0, marginBottom: 50 }}
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
              <ScrollView
                  style={styles.container}
                  contentContainerStyle={{ justifyContent: 'center', flexGrow: 1 }}
              >
                <ImageBackground
                    source={require('../assets/images/auth_bg.png')}
                    resizeMode="cover"
                    style={styles.image}
                >
                    { this.renderVideoPlayer() }
                    { this.renderForm() }
                </ImageBackground>
              </ScrollView>
            </DismissKeyboard>
        );
    }
}

const mapStateToProps = (state: any) => ({
    video: state.newVideoData.video,
    videoName: state.newVideoData.videoName,
    videoDescription: state.newVideoData.videoDescription,
    filmName: state.newVideoData.filmName,
    efirDate: state.newVideoData.efirDate,
    activityType: state.newVideoData.activityType,
    countryCityFrom: state.newVideoData.countryCityFrom,
});

const ActionCreators = Object.assign(
{},
{
        setVideoName,
        setVideoDescription,
        setFilmName,
        setEfirDate,
        setActivityType,
        setCountryCityFrom
    }
);
const mapDispatchToProps = (dispatch: any) => ({
    actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
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
        marginTop: 25,
        backgroundColor: 'transparent',
        width: '100%'
    }
});

const extendedComponent = compose(WithAuth)(SendAddedVideoScreen);
export default connect(mapStateToProps, mapDispatchToProps)(extendedComponent);
