import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import React from 'react';
import FONT_FAMILY from '../../../constants/fonts';
import scale from '../../../constants/responsive';
import color from '../../../constants/color';

const { width, height } = Dimensions.get('window');

const AboutScreen = (props) => {
  const logoSize = Math.min(width * 0.6, 160);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: width*0.86, alignSelf:'center'}}>
        <View style={{width: width*0.38, alignSelf: 'flex-start', marginTop: scale(20)}}>
            <Text style={styles.title}>Giới thiệu</Text>
        </View>

        <View style={styles.bodyTextBox}>
          <Text numberOfLines={1} style={styles.versionText}>
            Phiên bản 1.24.1
          </Text>
          <Text style={styles.bodyText}>
            {'  '}
            DocInsight là một dự án do Thanh Thảo và Phước Trí hoàn thiện trong vòng 3 tháng cho môn Đồ án 1 của trường Đại học Công nghệ Thông tin
          </Text>
          <Text style={styles.bodyText}>
            {'  '}
            Mục đích của ứng dụng là giúp các bác sĩ lâm sàng lưu trữ thông tin bệnh nhân và dự đoán bệnh cho bệnh nhân dựa trên đầu vào là một bức ảnh X-quang, đồng thời ứng dụng còn cung cấp giải thích lý do đưa ra dự đoán để bác sĩ tham khảo.
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    fontFamily: FONT_FAMILY.Regular,
    fontSize: scale(24),
    color: color.TitleActive,
  },
  bodyTextBox: {
    marginTop: height * 0.05,
    alignSelf: 'center',
  },
  bodyText: {
    textAlign: 'justify',
    fontSize: scale(18),
    fontFamily: FONT_FAMILY.Regular,
    color: color.TitleActive,
  },
});

export default AboutScreen;
