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
import SwitchSelector from './switchSelector';
import color from '../../constants/color';
import scale from '../../constants/responsive';
import { IMG_Logo } from '../../assets/images';
import { IC_Hide, IC_Show } from '../../assets/icons';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import FONT_FAMILY from '../../constants/fonts';
import SubmitButton from '../../components/submitButton';
import { RadioButton } from 'react-native-paper';

const Auth = () => {
  const [selected, setSelected] = useState('login');
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gender, setGender] = useState('Female'); // Initialize with a default value
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
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

  const signInPayLoadSchema = yup.object({
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
    userName: yup
      .string()
      .max(30, 'Invalid name')
      .required('Name cannot be blank'),
    passConfirm: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  });

  const {
    control: controlSignUp,
    handleSubmit: handleSignUp,
    formState: { errors: errorsSignUp },
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      userName: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signInPayLoadSchema),
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

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleShowConfirmPassword = () => {
    setPasswordConfirm(!passwordConfirm);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={IMG_Logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.welcome}>Xin chào, vui lòng xác thực để tiếp tục!</Text>
      </View>
      <View style={styles.body}>
        <SwitchSelector onSelect={setSelected} style={styles.switch} />
        {selected === 'login' ? (
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
                        setMail(email),
                        console.log(value),
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
                        setPass(password),
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
            <TouchableOpacity style={styles.ViewForgotText}>
              <Text style={styles.textForgot}>Quên mật khẩu?</Text>
            </TouchableOpacity>

            <View style={styles.buttonSignIn}>
              <SubmitButton
                text={'Đăng nhập'}
                backgroundColor={color.Button}
                color={color.White}
                // onPress={handleSubmit(handleLogin)}
              />
            </View>

            <View style={styles.ViewErrorText}>
              <Text style={styles.textError}>{errorMessage}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.form}>
            {/* emailInput */}
            <Controller
              name="email"
              control={controlSignUp}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputBox}>
                  <View style={styles.viewInput}>
                    <TextInput
                      onChangeText={(email) => [
                        onChange(email),
                        setMail(email),
                        console.log(value),
                      ]}
                      placeholder="*Email"
                      value={value}
                      placeholderTextColor={color.Description}
                      style={styles.inputText}
                      keyboardType="email-address"
                    />
                  </View>
                  {errorsSignUp?.email && (
                    <Text style={styles.textFailed}>{errorsSignUp.email.message}</Text>
                  )}
                </View>
              )}
            />

            {/* passwordInput */}
            <Controller
              name="password"
              control={controlSignUp}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputBox}>
                  <View style={styles.viewInput}>
                    <TextInput
                      secureTextEntry={!passwordVisible}
                      onChangeText={(password) => [
                        onChange(password),
                        setPass(password),
                      ]}
                      value={value}
                      placeholder="*Password"
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
                  {errorsSignUp?.password && (
                    <Text style={styles.textFailed}>{errorsSignUp.password.message}</Text>
                  )}
                </View>
              )}
            />
            {/* passwordConfirmInput */}
            <Controller
              name="passConfirm"
              control={controlSignUp}
              render={({ field: { onChange, value } }) => (
                <View style={styles.inputBox}>
                  <View style={styles.viewInput}>
                    <TextInput
                      secureTextEntry={!passwordConfirm}
                      onChangeText={(passwordConfirm) => [
                        onChange(passwordConfirm),
                        setPasswordConfirm(passwordConfirm),
                      ]}
                      value={value}
                      placeholder="*Confirm Password"
                      placeholderTextColor={color.Description}
                      style={styles.inputText}
                    />
                    <TouchableOpacity
                      style={styles.eyeIcon}
                      onPress={() => setPasswordConfirm(!passwordConfirm)}
                    >
                      {passwordConfirm ? <IC_Hide /> : <IC_Show />}
                    </TouchableOpacity>
                  </View>
                  {errorsSignUp?.passConfirm && (
                    <Text style={styles.textFailed}>{errorsSignUp.passConfirm.message}</Text>
                  )}
                </View>
              )}
            />

            {/* gender */}
            <View style={styles.genderContainer}>
              <RadioButton.Group
                onValueChange={handleGenderChange}
                value={gender}
              >
                <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <View style={styles.radioOption}>
                    <RadioButton value="Female" color={color.Button} />
                    <Text style={{ color: color.TitleActive }}>Nam</Text>
                  </View>
                  <View style={styles.radioOption}>
                    <RadioButton value="Male" color={color.Button} />
                    <Text style={{ color: color.TitleActive }}>Nữ</Text>
                  </View>
                </View>
              </RadioButton.Group>
            </View>

            <View style={styles.buttonSignIn}>
              <SubmitButton
                text={'Đăng kí'}
                backgroundColor={color.Button}
                color={color.White}
                // onPress={handleSubmit(handleSignUp)}
              />
            </View>

            <View style={styles.ViewErrorText}>
              <Text style={styles.textError}>{errorMessage}</Text>
            </View>
          </View>
        )}
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
  ViewForgotText: {
    alignSelf: 'flex-end',
  },
  textForgot: {
    fontFamily: FONT_FAMILY.Medium,
    color: color.Blue,
    fontSize: 12,
  },
  ViewErrorText: {
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
  genderContainer: {
    width: scale(339),
    marginTop: scale(20),
    padding: scale(10),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
});

export default Auth;
