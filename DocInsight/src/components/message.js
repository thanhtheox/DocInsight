import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import scale from '../constants/responsive';
import UnderLine from './underline';
import FONT_FAMILY from '../constants/fonts';
import color from '../constants/color';

const Message = props => {
  // take in visible(state), title, message, click cancel
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <Modal transparent visible={props.visible}>
      <View style={styles.background}>
        <View style={styles.noticeBox}>
          <UnderLine
            text={props.title}
            textStyle={[
              styles.titleText,
              props.title === 'Error' && {color: color.Warning, opacity: 0.7},
            ]}
            style={{
              color:
                props.title === 'Error' ? color.Warning : color.Button,
            }}
            lineColor={{
              backgroundColor:
                props.title === 'Error' ? color.Warning : color.Button,
            }}></UnderLine>
          <View style={styles.noticeMessage}>
            <View
              style={{
                width: '100%',
                height: '65%',
                justifyContent: 'center',
                marginTop: scale(-20),
              }}>
              <Text
                style={[
                  styles.messageText,
                  props.title === 'Error' ? {color: color.Warning} : null,
                ]}
                numberOfLines={5}>
                {props.message}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.buttonPosition}
              onPress={props.clickCancel}>
              <View
                style={[
                  styles.buttonBox,
                  props.title === 'Error'
                    ? {backgroundColor: color.Warning, opacity: 0.8}
                    : null,
                ]}>
                <Text style={styles.buttonText}>
                  {props.buttonText ? props.buttonText : 'OK'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default Message;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  noticeBox: {
    borderRadius: scale(20),
    width: scale(315),
    height: scale(322),
    backgroundColor: color.White,
    overflow: 'hidden',
  },
  noticeTitle: {
    backgroundColor: color.White,
    width: '100%',
    paddingHorizontal: scale(30),
    height: scale(66),
  },
  titleText: {
    color: color.Button,
    fontFamily: FONT_FAMILY.SemiBold,
    fontSize: scale(24),
    alignSelf: 'center',
  },
  noticeMessage: {
    flex: 1,
    padding: scale(20),
  },
  messageText: {
    color: color.Button,
    fontFamily: FONT_FAMILY.Regular,
    fontSize: scale(20),
    textAlign: 'center',
  },
  buttonPosition: {
    marginTop: scale(20),
    alignSelf: 'center',
  },
  buttonBox: {
    borderRadius: scale(20),
    backgroundColor: color.Button,
    height: scale(53),
    width: scale(278),
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontFamily: FONT_FAMILY.Regular,
    color: color.White,
    fontSize: scale(20),
  },
});
