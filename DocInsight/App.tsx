import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image
} from 'react-native';
import FONT_FAMILY from './src/constants/fonts';
import color from './src/constants/color';
import SubmitButton from './src/components/submitButton';
import scale from './src/constants/responsive';
import Header from './src/components/header';
import Onboarding from './src/screens/onboarding';
import { IMG_Onboard1 } from './src/assets/images';
import OnboardingScreen from './src/screens/onboarding';
import UploadImage from './src/components/uploadImage';
import SwitchSelector from './src/screens/auth/switchSelector';
import Auth from './src/screens/auth/auth';
import InfoInput from './src/components/infoInput';


function App(): JSX.Element {
 
  return (
    <SafeAreaView style={{backgroundColor: color.White, flex: 1}}>
      <InfoInput/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 hello: {
  fontFamily: FONT_FAMILY.SemiBold,
  color: color.Blue, 
 }
});

export default App;
