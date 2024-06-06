import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import color from '../constants/color';
import scale from '../constants/responsive';
import {IC_Drawer, IC_Logo} from '../assets/icons';
import {IMG_Logo} from '../assets/images';

const Header = props => {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.viewIcon}>
        <IC_Drawer />
      </TouchableOpacity>
      <View style={styles.viewLogo}>
        <Image
          source={IMG_Logo}
          style={styles.image}
          resizeMode="contain"></Image>
      </View>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
    paddingHorizontal: scale(16),
    // flex: 1,
    flexDirection: 'row',
    height: scale(70),
    // backgroundColor: color.GraySolid,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewIcon: {
    paddingLeft: scale(-5),
    //borderWidth: 1,
  },
  viewLogo: {
    width: '95%',
    height: '85%',
    alignItems: 'center',
    //borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
