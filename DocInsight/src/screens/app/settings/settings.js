import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native';
import React, { useState } from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import FONT_FAMILY from '../../../constants/fonts';
import color from '../../../constants/color';
import scale from '../../../constants/responsive';
import Message from '../../../components/message';

const { width, height } = Dimensions.get('window');
const SettingsScreen = (props) => {
    const [title, setTitle] = useState('Error');
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    const shareFunction = () => {
      setTitle("Copied link to share")
      setVisible(true);
      Clipboard.setString('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');
      setMessage('https://play.google.com/store/apps/details?id=com.filterpicturern&pcampaignid=web_share');   
    }
    const helpFunction = () => {
        setTitle("Send mail to")
        setVisible(true);
        setMessage('utrgk21.29@gmail.com');   
    }
  return (
    <SafeAreaView style={styles.container}>
        <Message
            visible={visible}
            clickCancel={() => { setVisible(false) }}
            title={title}
            message={message}
        />
        <Text style={styles.titlePart}>Cài đặt</Text>
        <View style={styles.frame}>
            <TouchableOpacity style={styles.button} onPress={() => props.navigation.navigate('AboutScreen')}
              >
                <Text style={styles.buttonText}>Giới thiệu DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={shareFunction}>
                <Text style={styles.buttonText}>Chia sẻ DocInsights</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.helpButton} onPress={helpFunction}>
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