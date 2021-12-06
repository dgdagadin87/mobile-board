import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View } from './Themed';
import platform from '../services/platform-service';

export const CustomLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
};

const styles = StyleSheet.create({
	container: {
        position: 'absolute',
        top: 0,
        left: 0,
        flex: 1,
        zIndex: 100,
        justifyContent: 'center',
        width: '100%',
        height: (platform.height*1.15),
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#ffffff',
        opacity: .5,
    },
});