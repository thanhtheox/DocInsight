import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import {IC_Logout} from '../assets/icons';
import {IMG_Logo} from '../assets/images';
import color from '../constants/color';
import useLogout from '../hooks/useLogout';

const Header = ({navigation}) => {
  const logout = useLogout();
  const signOut = async () => {
    try {
      logout();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.viewLogo}>
        <Image
          source={IMG_Logo}
          style={styles.image}
          resizeMode="contain"></Image>
      </View>
      <TouchableOpacity style={styles.viewIcon} onPress={() => signOut()}>
        <IC_Logout color={color.TitleActive}/>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(16),
    flexDirection: 'row',
    height: scale(70),
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  viewIcon: {
    alignSelf:'center',
    marginTop:scale(10)
  },
  viewLogo: {
    width: '95%',
    height: '85%',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
