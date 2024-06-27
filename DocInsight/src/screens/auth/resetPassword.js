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
import useAuth from '../../hooks/useAuth';
import { IC_Hide, IC_Show } from '../../assets/icons';
import Message from '../../components/message';


const ResetPasswordScreen = (props) => {
  const {id} = props.route.params;
  const axiosPrivate = useAxiosPrivate();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [title, setTitle] = useState('LỖI');
  const [visible, setVisible] = useState(false);
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const resetPasswordPayLoadSchema = yup.object({
    otp: yup.number().required("OTP cannot be blank"),
    password: yup
        .string()
        .required("Password can not be blank")
        .min(6, "Password length must be more than 6 characters")
        .max(16, "Password length must be less than 16 characters")
        .matches(
            passwordRegex,
            "Password must contain uppercase, lowercase and number characters"
        ),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match"),
  });

  const {
    control: controlResetPassword,
    handleSubmit: handleResetPassword,
    formState: { errors: errorsReset },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      otp: '',
      password: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(resetPasswordPayLoadSchema),
  });

  const resetPasswordFunction = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        `/reset-password/${id}`,
        JSON.stringify({password: password, otp: otp}),
      );
      console.log('success', JSON.stringify(response.data));
      props.navigation.navigate('SignInScreen');
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
      setVisible(true);
      setErrorMessage("Xảy ra lỗi khi thay đổi mật khẩu?");
      setTitle('LỖI');
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
        <Text style={styles.welcome}>Xin chào, vui lòng nhập OTP và mật khẩu mới để hoàn thành đổi mật khẩu!</Text>
      </View>
      <View style={styles.body}>
        <View style={styles.form}>
          {/* otpInput */}
          <Controller
            name="otp"
            control={controlResetPassword}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={(otp) => [
                      onChange(otp),
                      setOtp(otp),
                    ]}
                    placeholder="*OTP"
                    value={value}
                    placeholderTextColor={color.Description}
                    style={styles.inputText}
                    keyboardType="numeric"
                  />
                </View>
                {errorsReset?.otp && (
                  <Text style={styles.textFailed}>{errorsReset.otp.message}</Text>
                )}
              </View>
            )}
          />
          {/* passwordInput */}
          <Controller
            name="password"
            control={controlResetPassword}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                  <TextInput
                    secureTextEntry={!passwordVisible}
                    onChangeText={(password) => [
                      onChange(password),
                      setPassword(password),
                    ]}
                    value={value}
                    placeholder="*Mật khẩu (ít nhất 8 ký tự)"
                    placeholderTextColor={color.Description}
                    style={styles.inputText}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  >
                    {passwordVisible ? <IC_Show /> : <IC_Hide />}
                  </TouchableOpacity>
                </View>
                {errorsReset?.password && (
                  <Text style={styles.textFailed}>{errorsReset.password.message}</Text>
                )}
              </View>
            )}
          />
          {/* passwordConfirmInput */}
          <Controller
            name="passwordConfirm"
            control={controlResetPassword}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                  <TextInput
                    secureTextEntry={!passwordConfirmVisible}
                    onChangeText={(passwordConfirm) => [
                      onChange(passwordConfirm),
                      setPasswordConfirm(passwordConfirm),
                    ]}
                    value={value}
                    placeholder="*Xác nhận lại mật khẩu"
                    placeholderTextColor={color.Description}
                    style={styles.inputText}
                  />
                  <TouchableOpacity
                    style={styles.eyeIcon}
                    onPress={() => setPasswordConfirmVisible(!passwordConfirmVisible)}
                  >
                    {passwordConfirmVisible ? <IC_Show /> : <IC_Hide />}
                  </TouchableOpacity>
                </View>
                {errorsReset?.passwordConfirm && (
                  <Text style={styles.textFailed}>{errorsReset.passwordConfirm.message}</Text>
                )}
              </View>
            )}
          />
          <View style={styles.buttonSignIn}>
            <SubmitButton
              text={'Tiếp tục'}
              backgroundColor={color.Button}
              color={color.White}
              onPress={handleResetPassword(resetPasswordFunction)}
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

export default ResetPasswordScreen;
