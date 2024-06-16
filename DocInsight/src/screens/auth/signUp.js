// App.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import * as yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadioButton } from 'react-native-paper';

import SwitchSelector from './switchSelector';
import color from '../../constants/color';
import scale from '../../constants/responsive';
import { IMG_Logo } from '../../assets/images';
import { IC_Hide, IC_Show } from '../../assets/icons';
import FONT_FAMILY from '../../constants/fonts';
import SubmitButton from '../../components/submitButton';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';


const SignUpScreen = (props) => {
  const {setAuth} = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [gender, setGender] = useState('male');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordConfirmVisible, setPasswordConfirmVisible] = useState(false);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

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
    name: yup
      .string()
      .max(30, 'Invalid name')
      .required('Name cannot be blank'),
    passwordConfirm: yup
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
      name: '',
      passwordConfirm: '',
    },
    resolver: yupResolver(signInPayLoadSchema),
  });

  const signUpFunction = async () => {
    console.log({
      email: email,
      name: name,
      password: password,
      gender: gender
    });
    try {
      setLoading(true);
      const response = await axiosPrivate.post(
        '/sign-up',
        JSON.stringify({
          email: email,
          name: name,
          password: password,
          gender: gender
        }),
      );
      console.log('success', JSON.stringify(response.data));

      const responseLogin = await axiosPrivate.post(
        '/login',
        JSON.stringify({email: email, password: password}),
      );
      const accessToken = responseLogin?.data?.accessToken;
      console.log('successLogin', JSON.stringify(response.data));
      setAuth({
        email: email,
        accessToken,
        userId: responseLogin.data.user._id,
      });
      setLoading(false);
      // props.navigation.navigate('AppStackScreen');
    } catch (err) {
      setLoading(false);
      // setVisible(true);
      setErrorMessage(err?.toString()||"Network Error");
      // setTitle('Error');
      console.log(err);
    }
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={IMG_Logo} style={styles.image} resizeMode="contain" />
        <Text style={styles.welcome}>Xin chào, vui lòng xác thực để tiếp tục!</Text>
      </View>
      <View style={styles.body}>
        <SwitchSelector navigate={() => props.navigation.navigate('SignInScreen')} screen={'SignUp'}/>
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
                      setEmail(email),
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
          {/* name */}
          <Controller
            name="name"
            control={controlSignUp}
            render={({ field: { onChange, value } }) => (
              <View style={styles.inputBox}>
                <View style={styles.viewInput}>
                  <TextInput
                    onChangeText={(name) => [
                      onChange(name),
                      setName(name),
                    ]}
                    placeholder="*Full name"
                    value={value}
                    placeholderTextColor={color.Description}
                    style={styles.inputText}
                    keyboardType="default"
                  />
                </View>
                {errorsSignUp?.name && (
                  <Text style={styles.textFailed}>{errorsSignUp.name.message}</Text>
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
                      setPassword(password),
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
            name="passwordConfirm"
            control={controlSignUp}
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
                    placeholder="*Confirm Password"
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
                {errorsSignUp?.passwordConfirm && (
                  <Text style={styles.textFailed}>{errorsSignUp.passwordConfirm.message}</Text>
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
                  <RadioButton value="male" color={color.Button} />
                  <Text style={{ color: color.TitleActive }}>Nam</Text>
                </View>
                <View style={styles.radioOption}>
                  <RadioButton value="female" color={color.Button} />
                  <Text style={{ color: color.TitleActive }}>Nữ</Text>
                </View>
              </View>
            </RadioButton.Group>
          </View>

          <View style={styles.buttonSignUp}>
            <SubmitButton
              text={'Đăng kí'}
              backgroundColor={color.Button}
              color={color.White}
              loading={loading}
              onPress={handleSignUp(signUpFunction)}
            />
          </View>

          <View style={styles.viewErrorText}>
            <Text style={styles.textError}>{errorMessage}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  buttonSignUp: {
    marginTop: scale(40),
    alignSelf: 'center',
  },
  viewErrorText: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(10),
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
    marginTop: scale(10),
    padding: scale(10),
  },
  radioOption: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: scale(10),
  },
});

export default SignUpScreen;
