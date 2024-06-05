import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import FONT_FAMILY from './src/constants/fonts';
import color from './src/constants/color';

function App(): JSX.Element {
 
  return (
    <SafeAreaView>
      <Text style = {styles.hello}>Hello</Text>
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
