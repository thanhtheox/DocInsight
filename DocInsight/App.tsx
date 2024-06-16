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
import OnboardingScreen from './src/screens/onboarding';
import SignInScreen from './src/screens/auth/signIn';
import SignUpScreen from './src/screens/auth/signUp';
import { AuthStackScreen } from './src/routes/AuthNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthProvider';
import RootNavigator from './src/routes/RootNavigation';


const App = (props: any) => {
  return (
    <GestureHandlerRootView style={{ backgroundColor: color.White, flex: 1 }}>
      <AuthProvider>
        <RootNavigator {...props} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
export default App;
