import * as React from 'react';
import {
	StyleSheet,
	ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Text, View } from '../components/Themed';
import { CustomButton } from '../components/CustomButton';

class DescriptionScreen extends React.Component<any, any> {
	render() {
		return (
			<View style={[styles.container]}>
				<ImageBackground
					source={require('../assets/images/auth_bg.png')}
					resizeMode="cover"
					style={styles.image}
				>
					<View style={{ backgroundColor: 'transparent', width: '70%', marginLeft: '15%' }}>
						<Text
							style={{ backgroundColor: 'transparent', fontSize: 18, color: '#000', textAlign: 'justify' }}
						>{ this.props.description }</Text>
					</View>
					<CustomButton
						buttonText="Закрыть"
						isDisabled={false}
						onButtonClick={() => this.props.navigation.goBack()}
					/>
				</ImageBackground>
			</View>
		);
	}
};

const mapStateToProps = (state: any) => ({
	description: state.mainData.description,
});

const ActionCreators = {};
const mapDispatchToProps = (dispatch: any) => ({
  	actions: bindActionCreators(ActionCreators, dispatch),
});

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		flex: 1,
		justifyContent: "center",
		width: '100%',
		height: '100%'
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(DescriptionScreen);
