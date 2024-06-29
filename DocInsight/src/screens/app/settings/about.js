import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { IMG_Logo2 } from '../../../assets/images';
import Header from '../../../components/header';
import React from 'react';
import FONT_FAMILY from '../../../constants/fonts';
import scale from '../../../constants/responsive';
import color from '../../../constants/color';

const { width, height } = Dimensions.get('window');

const AboutScreen = (props) => {
  const logoSize = Math.min(width * 0.8, 180);

  return (
    <SafeAreaView style={styles.container}>
        <Header></Header>
      <View style={{width: width*0.86, alignSelf:'center'}}>
        <View style={{width: width*0.38,justifyContent: 'space-between',
        alignSelf: 'flex-start', marginTop: height * 0.01, flexDirection: 'row' }}>
            {/* <TouchableOpacity onPress={() => props.navigation.goBack()}>
                <IC_Back />
            </TouchableOpacity> */}
            <Text style={styles.title}>About</Text>
        </View>

        <View style={styles.bodyTextBox}>
          <Image source={IMG_Logo2} style={[styles.logo, { width: logoSize, height: logoSize }]} />
          <Text numberOfLines={1} style={styles.versionText}>
            Version 1.24.1
          </Text>
          <Text numberOfLines={5} style={styles.bodyText}>
            {'  '}
            DocInsights là một ứng dụng được hoàn thành trong Đồ án 2 của Thanh Thảo và Phước Trí ở 
            trường Đại học Công nghệ Thông tin - ĐHQG TP.HCM.
          </Text>
          <Text numberOfLines={10} style={styles.bodyText}>
            {'  '}
            Mục đích của ứng dụng là giúp các bác sĩ có thể đưa ra các dự đoán về bệnh liên quan đến phổi cho bệnh nhân thông qua ảnh chụp X-Quang và lưu trữ chúng để có thể xem lại ở bất kì đâu.
            Trong ứng dụng này, chúng tôi cung cấp ba loại bệnh liên quan đến phổi bao gồm: Viêm phổi, Lao phổi, Covid-19.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: 20,
    color: color.TitleActive,
},
  logo: {
    borderRadius: 360,
    alignSelf: 'center',
    backgroundColor: color.White,
  },
  title: {
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: scale(26),
    color: color.TitleActive,
  },
  versionText: {
    marginVertical: height*0.03,
    textAlign: 'center',

    fontFamily: FONT_FAMILY.Medium,
    fontSize: 20,
    color: color.TitleActive,
  },
  bodyTextBox: {
    marginTop: height * 0.05,
    alignSelf: 'center',
    width: '100%',
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: 16,
    fontFamily: FONT_FAMILY.Medium,
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: scale(18),
    fontFamily: FONT_FAMILY.Regular,
    color: color.TitleActive,
  },
});

export default AboutScreen;

