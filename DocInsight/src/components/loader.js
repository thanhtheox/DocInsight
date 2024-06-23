import React from 'react';
import {Modal, StyleSheet, View, ActivityIndicator} from 'react-native';
import color from '../constants/color';

const Loader = props => {
  return (
    <Modal transparent visible={props.visible}>
      <View style={styles.background}>
        <ActivityIndicator color={color.Button} size={100} />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});