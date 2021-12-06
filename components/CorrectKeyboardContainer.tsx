import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import * as React from 'react';
import PlatformService from '../services/platform-service';

const CorrectKeyboardContainer = ({ children }: any) => (
    <KeyboardAwareScrollView extraScrollHeight={0}
                             extraHeight={0} style={{ flex: 1 }} enableOnAndroid={true}>
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            {children}
        </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
);

export default CorrectKeyboardContainer;
