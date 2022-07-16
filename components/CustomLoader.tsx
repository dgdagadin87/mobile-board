import * as React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { View, Text } from './Themed';
import platform from '../services/platform-service';

export const CustomLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#0099cc" />
            <Text style={styles.text}>Подождите, идет загрузка...</Text>
            
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
        height: (platform.height*1.3),
        padding: 10,
        backgroundColor: '#ffffff',
        opacity: .9,
    },
    text: {
        color: '#0099cc',
        opacity: 1,
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        width: '100%',
    }
});
