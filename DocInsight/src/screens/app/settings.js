import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
import FONT_FAMILY from '../../constants/fonts';
import color from '../../constants/color';
import scale from '../../constants/responsive';

const { width, height } = Dimensions.get('window');
const SettingsScreen = (props) => {
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.titlePart}>Cài đặt</Text>
        <View style={styles.frame}>
            <TouchableOpacity style={styles.button} >
                <Text style={styles.buttonText}>Giới thiệu DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Chia sẻ DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton}>
                <Text style={styles.buttonText}>Trợ giúp</Text>
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  titlePart: {
    color:color.TitleActive, 
    fontSize: scale(22), 
    fontFamily: FONT_FAMILY.SemiBold, 
    marginLeft: scale(20), 
    marginTop: scale(30)
    },
  frame: {
    marginTop: scale(20),
    height: height*0.3,
    width: width*0.9,
    alignSelf:'center',
    gap: height*0.004,
    justifyContent: 'center',
    backgroundColor: color.White,
    alignItems:'center',
    borderColor: color.Button,
    borderWidth: 2,
    borderRadius: scale(20),
  },
  button: {
    height: '30%',
    width: '85%',
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: color.Button,
  },
  helpButton: {
    height: '30%',
    width: '85%',
    justifyContent: 'center',
  },
  buttonText: {
    fontFamily: FONT_FAMILY.Regular,
    fontSize: scale(18),
    color: color.TitleActive,
  },
})