import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import scale from '../../constants/responsive';
import color from '../../constants/color';
import FONT_FAMILY from '../../constants/fonts';

const SwitchSelector = ({ onSelect }) => {
  const [selected, setSelected] = useState('login');

  const handleSelect = (value) => {
    setSelected(value);
    onSelect(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          selected === 'login' && styles.selectedButton,
        ]}
        onPress={() => handleSelect('login')}
      >
        <Text style={[
          styles.buttonText,
          selected === 'login' && styles.selectedButtonText,
        ]}>Đăng nhập</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.button,
          selected === 'register' && styles.selectedButton,
        ]}
        onPress={() => handleSelect('register')}
      >
        <Text style={[
          styles.buttonText,
          selected === 'register' && styles.selectedButtonText,
        ]}>Đăng kí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: color.White,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    width: scale(320),
    height: scale(52),
  },
  button: {
    flex: 1,
    paddingVertical: scale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedButton: {
    backgroundColor: color.Blue,
  },
  buttonText: {
    fontSize: scale(18),
    color: color.TitleActive,
    fontFamily: FONT_FAMILY.SemiBold,
  },
  selectedButtonText: {
    color: color.White,
  },
});

export default SwitchSelector;
