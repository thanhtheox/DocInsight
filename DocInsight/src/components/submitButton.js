import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import scale from '../constants/responsive';
import FONT_FAMILY from '../constants/fonts';
import color from '../constants/color';
  
  const SubmitButton = props => {
    return (
      <TouchableOpacity
        style={[
          styles.container,
          {opacity: props.disabled ? 0.75 : 1},
          {backgroundColor: props.backgroundColor},
          {borderColor: props.borderColor},
          {borderWidth: props.borderWidth},
        ]}
        onPress={props.onPress}
        disabled={props.disabled}>
        <Text style={[styles.text, {color: props.color}]}>{props.text}</Text>
        {props.loading ? (
          <ActivityIndicator
            size="large"
            color={color.White}
            style={{position: 'absolute', right: scale(20)}}
          />
        ) : null}
      </TouchableOpacity>
    );
  };
  
  export default SubmitButton;
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      width: scale(339),
      height: scale(55),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: scale(18),
      textAlign: 'center',
      fontFamily: FONT_FAMILY.SemiBold
    },
  });