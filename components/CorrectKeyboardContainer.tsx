import { Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as React from 'react';
import PlatformService from '../services/platform-service';

const CorrectKeyboardContainer = ({ children }: any) => (
    <KeyboardAvoidingView
        behavior={PlatformService.isIos ? 'padding' : 'height'}
        style={{ flex: 1 }}
    >
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
);

export default CorrectKeyboardContainer;
