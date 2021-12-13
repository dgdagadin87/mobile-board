import * as React from 'react';
// @ts-ignore
import { SliderBox } from 'react-native-image-slider-box';
import PlatformService from '../services/platform-service';

class SliderScreen extends React.Component<any, any> {
	private platform = PlatformService;

	constructor(props: any) {
		super(props);

		this.onSlideHandler = this.onSlideHandler.bind(this);

		this.state = {
			images: [
				require('../assets/images/slider/1.png'),
				require('../assets/images/slider/2.png'),
				require('../assets/images/slider/3.png'),
				require('../assets/images/slider/4.png'),
				require('../assets/images/slider/5.png'),
				require('../assets/images/slider/6.png'),
			]
		};
	}

	private onSlideHandler(index: number): void {
		if (index === 5) {
			this.props.navigation.navigate('Login');
		}
	}

	render() {
		return (
			<SliderBox
				images={this.state.images}
				sliderBoxHeight={this.platform.height*(this.platform.isIos ? 1 : 1.05)}
				dotStyle={{ width: 0, height: 0 }}
				currentImageEmitter={this.onSlideHandler}
				resizeMode="cover"
			/>
		);
	}
};

export default SliderScreen;
