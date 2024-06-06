import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
  } from 'react-native';
  import React from 'react';
  import scale from '../constants/responsive';
  
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
      </TouchableOpacity>
    );
  };
  
  export default SubmitButton;
  
  const styles = StyleSheet.create({
    container: {
      borderRadius: 12,
      width: scale(275),
      height: scale(43),
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    text: {
      fontSize: scale(16),
      textAlign: 'center',
      fontWeight: '700',
    },
  });