import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import color from '../../constants/color';
import scale from '../../constants/responsive';
import { IMG_Logo } from '../../assets/images';
import FONT_FAMILY from '../../constants/fonts';
import SubmitButton from '../../components/submitButton';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import Message from '../../components/message';


const ForgetPasswordScreen = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('');
  const [visible, setVisible] = useState(false);

  const forgetPasswordPayLoadSchema = yup.object({
    email: yup
      .string()
      .required('Email cannot be blank')
      .email('Invalid email')
      .max(50, 'Email length must be less than 50 characters'),
  });

  const {
    control: controlForgetPassword,
    handleSubmit: handleForgetPassword,
    formState: { errors: errorsForget },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
    resolver: yupResolver(forgetPasswordPayLoadSchema),
  });

  const forgetPasswordFunction = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        '/forget-password',
        JSON.stringify({email: email}),
      );
      console.log('success', JSON.stringify(response.data));
      const id = response.data.owner;
      props.navigation.navigate('ResetPasswordScreen',{
        id: id
      })
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
      setVisible(true);
      setErrorMessage("What's wrong here?");
      setTitle('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Message
          visible={visible}
          clickCancel={() => { setVisible(false) }}
          title={title}
          message={errorMessage}
      />
      <View style={styles.header}>
        <Image source={IMG_Logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.welcome}>Xin chào, vui lòng nhập email để tiếp tục!</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          {/* emailInput */}
          <Controller
            name="email"
            control={controlForgetPassword}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={(email) => [
                      onChange(email),
                      setEmail(email),
                    ]}
                    placeholder="*Email"
                    value={value}
                    placeholderTextColor={color.Description}
                    style={styles.inputText}
                    keyboardType="email-address"
                  />
                </View>
                {errorsForget?.email && (
                  <Text style={styles.textFailed}>{errorsForget.email.message}</Text>
                )}
              </View>
            )}
          />

          <View style={styles.buttonSignIn}>
            <SubmitButton
              text={'Tiếp tục'}
              backgroundColor={color.Button}
              color={color.White}
              onPress={handleForgetPassword(forgetPasswordFunction)}
              loading={loading}
            />
          </View>

          {/* <View style={styles.viewErrorText}>
            <Text style={styles.textError}>{errorMessage}</Text>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'column',
    height: scale(100),
  },
  body: {
    alignItems: 'center',
    paddingTop: scale(37),
  },
  text: {
    fontSize: scale(14),
    color: color.TitleActive,
  },
  image: {
    width: '70%',
    height: '90%',
  },
  welcome: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.Regular,
    color: color.TitleActive,
    paddingLeft: scale(20),
  },
  form: {
    alignItems: 'center',
    paddingTop: scale(10),
  },
  inputBox: {
    paddingTop: scale(20),
    width: scale(339),
    height: scale(100),
    justifyContent: 'center',
  },
  viewInput: {
    height: scale(55),
    borderWidth: 1,
    alignContent: 'center',
    justifyContent: 'center',
    borderColor: color.TitleActive,
    fontFamily: FONT_FAMILY.Medium,
    borderRadius: scale(12),
  },
  inputText: {
    color: color.TitleActive,
    fontSize: 14,
    marginLeft: scale(5),
    fontFamily: FONT_FAMILY.Medium,
  },
  buttonSignIn: {
    marginTop: scale(61),
    alignSelf: 'center',
  },
  viewForgotText: {
    alignSelf: 'flex-end',
  },
  textForgot: {
    fontFamily: FONT_FAMILY.Medium,
    color: color.Blue,
    fontSize: 12,
  },
  viewErrorText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(21),
  },
  textError: {
    color: color.Warning,
    fontSize: 16,
    fontWeight: '400',
  },
  textFailed: {
    paddingLeft: scale(10),
    marginTop: scale(7),
    justifyContent: 'center',
    fontSize: scale(12),
    color: color.Warning,
  },
  eyeIcon: {
    position: 'absolute',
    right: scale(15),
    bottom: scale(15),
  },
});

export default ForgetPasswordScreen;
