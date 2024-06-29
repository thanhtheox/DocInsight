import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, Dimensions } from 'react-native';
import React, { useState } from 'react';
//import Clipboard from '@react-native-clipboard/clipboard';
import FONT_FAMILY from '../../../constants/fonts';
import Message from '../../../constants/message';
import Header from '../../../components/header';
import color from '../../../constants/color';
import scale from '../../../constants/responsive';

const { width, height } = Dimensions.get('window');
const SettingScreen = (props) => {
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    // const handleButtonPress = () => {
    //     setTitle("Copied link to share")
    //     setVisible(true);
    //     Clipboard.setString('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');
    //     setMessage('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');   
    // }
    const handleButtonPress1 = () => {
        setTitle("Send mail to")
        setVisible(true);
        setMessage('utrgk21.29@gmail.com');   
    }
  return (
    <SafeAreaView style={styles.container}>
        <Header></Header>
      <View style={{width: width*0.86, alignSelf:'center'}}>
        <View style={{width: width*0.45,justifyContent: 'space-between',
        alignSelf: 'flex-start', marginTop: height * 0.01, flexDirection: 'row' }}>
            {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <IC_Back />
            </TouchableOpacity> */}
            <Text style={styles.title}>Cài đặt</Text>
        </View>
        <View style={styles.frame}>
            {/* onPress={() => props.navigation.navigate('AboutScreen')} onPress={handleButtonPress} */}
            <TouchableOpacity style={styles.takePhotoButton} >
                <Text style={styles.buttonText}>Giới thiệu DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.takePhotoButton} >
                <Text style={styles.buttonText}>Chia sẻ DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton} onPress={handleButtonPress1}>
                <Text style={styles.buttonText}>Trợ giúp</Text>
            </TouchableOpacity>
        </View>
        <Message
            visible={visible}
            clickCancel={() => { setVisible(false) }}
            title={title}
            message={message}
        />
      </View>
    </SafeAreaView>
  )
}


export default SettingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.White,
  },
  title: {
      fontFamily: FONT_FAMILY.SemiBold,
      fontSize: 20,
      color: color.TitleActive,
  },
  frame: {
      marginTop: height*0.02,
      height: height*0.3,
      gap: height*0.004,
      justifyContent: 'center',
      backgroundColor: '#FFFFFF',
      alignItems:'center',
      borderRadius: 20,
      borderWidth: scale(1),
  },
  takePhotoButton: {
    height: '30%',
    width: '85%',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  helpButton: {
    height: '27%',
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