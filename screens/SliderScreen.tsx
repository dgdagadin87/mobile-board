import * as React from 'react';
// @ts-ignore
//import { SliderBox } from 'react-native-image-slider-box';
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
			null
		);
	}
};

export default SliderScreen;
