import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    SafeAreaView,
  } from 'react-native';
  import React from 'react';
  import scale from '../constants/responsive';
import color from '../constants/color';
import FONT_FAMILY from '../constants/fonts';
import { IC_Camera, IC_Library } from '../assets/icons';
  
  const UploadImage = props => {
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity
          style={styles.camera}
          onPress={props.onPressTake}>
            <IC_Camera/>
          <Text style={styles.text1}>Chụp ảnh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.upload}
          onPress={props.onPressPick}>
            <IC_Library/>
          <Text style={styles.text2}>Tải ảnh lên</Text>
          
        </TouchableOpacity>
      </SafeAreaView>
    );
  };
  
  export default UploadImage;
  
  const styles = StyleSheet.create({
    container: {
      width: '80%',
      height: scale(52),
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
    },
    camera: {
      paddingHorizontal: scale(20),
      borderRadius: 12,
      width: scale(153),
      height: scale(52),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: color.Button,
      justifyContent: 'space-between'
    },
    upload: {
      paddingHorizontal: scale(15),
      borderRadius: 12,
      width: scale(153),
      height: scale(52),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: color.Button,
      justifyContent: 'space-between'
    },
    text1: {
      fontSize: scale(16),
      textAlign: 'center',
      color: color.TitleActive,
      fontFamily: FONT_FAMILY.SemiBold,
    },
    text2: {
      fontSize: scale(16),
      textAlign: 'center',
      color: color.White,
      fontFamily: FONT_FAMILY.SemiBold,
    },
  });