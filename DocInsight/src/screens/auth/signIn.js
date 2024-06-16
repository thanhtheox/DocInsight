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

import SwitchSelector from './switchSelector';
import color from '../../constants/color';
import scale from '../../constants/responsive';
import { IMG_Logo } from '../../assets/images';
import { IC_Hide, IC_Show } from '../../assets/icons';
import FONT_FAMILY from '../../constants/fonts';
import SubmitButton from '../../components/submitButton';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';


const SignInScreen = (props) => {
  const axiosPrivate = useAxiosPrivate();
  const {setAuth} = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [title, setTitle] = useState('');
  // const [visible, setVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

  const logInPayLoadSchema = yup.object({
    email: yup
      .string()
      .required('Email cannot be blank')
      .email('Invalid email')
      .max(50, 'Email length must be less than 50 characters'),
    password: yup
      .string()
      .required('Password can not be blank')
      .min(6, 'Password length must be more than 6 characters')
      .max(16, 'Password length must be less than 16 characters')
      .matches(
        passwordRegex,
        'Password must contain uppercase, lowercase and number characters'
      ),
  });

  const {
    control: controlLogIn,
    handleSubmit: handleLogin,
    formState: { errors: errorsLogin },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: yupResolver(logInPayLoadSchema),
  });

  const loginFunction = async () => {
    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        '/login',
        JSON.stringify({email: email, password: password}),
      );
      console.log('success', JSON.stringify(response.data));
      const accessToken = response?.data?.accessToken;
      const userId = response?.data?.user._id;

      setAuth({
        email: email,
        accessToken: accessToken,
        userId: userId,
      });
      setLoading(false);
    } catch (err) {
      console.log('err', err);
      setLoading(false);
      // setVisible(true);
      // setErrorMessage(err||'Error Network');
      // setTitle('Error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={IMG_Logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.welcome}>Xin chào, vui lòng xác thực để tiếp tục!</Text>
      </View>
      <View style={styles.body}>
        <SwitchSelector navigate={() => props.navigation.navigate('SignUpScreen')} screen={'SignIn'}/>
        <View style={styles.form}>
          {/* emailInput */}
          <Controller
            name="email"
            control={controlLogIn}
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
                {errorsLogin?.email && (
                  <Text style={styles.textFailed}>{errorsLogin.email.message}</Text>
                )}
              </View>
            )}
          />
          {/* passwordInput */}
          <Controller
            name="password"
            control={controlLogIn}
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
                    placeholder="Password"
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
                {errorsLogin?.password && (
                  <Text style={styles.textFailed}>{errorsLogin.password.message}</Text>
                )}
              </View>
            )}
          />
          <TouchableOpacity style={styles.viewForgotText}>
            <Text style={styles.textForgot}>Quên mật khẩu?</Text>
          </TouchableOpacity>

          <View style={styles.buttonSignIn}>
            <SubmitButton
              text={'Đăng nhập'}
              backgroundColor={color.Button}
              color={color.White}
              onPress={handleLogin(loginFunction)}
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

export default SignInScreen;
