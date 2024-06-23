import React from 'react';
import { Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/app/home';

import PatientProfileListScreen from '../screens/app/patientProfile/patientProfileList';
import PatientProfileDetailsScreen from '../screens/app/patientProfile/patientProfileDetails';
import AddPatientProfileScreen from '../screens/app/patientProfile/addPatientProfile';
import EditPatientProfileScreen from '../screens/app/patientProfile/editPatientProfile';

import PredictResultScreen from '../screens/app/predict/predictResult';
import PredictInputScreen from '../screens/app/predict/predictInput';

import SettingsScreen from '../screens/app/settings/settings';
import AboutScreen from '../screens/app/settings/about';

import Header from '../components/header';

import color from '../constants/color';
import { IC_Folder, IC_Home, IC_Predict, IC_Setting } from '../assets/icons';
import FONT_FAMILY from '../constants/fonts';
import scale from '../constants/responsive';


const PatientProfileStack = createNativeStackNavigator();

const PatientProfileStackScreen = () => {

  return (
    <PatientProfileStack.Navigator
      initialRouteName="PatientProfileListScreen"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}>
        <PatientProfileStack.Screen name="PatientProfileListScreen" component={PatientProfileListScreen} />
        <PatientProfileStack.Screen name="PatientProfileDetailsScreen" component={PatientProfileDetailsScreen} />
        <PatientProfileStack.Screen name="AddPatientProfileScreen" component={AddPatientProfileScreen} />
        <PatientProfileStack.Screen name="EditPatientProfileScreen" component={EditPatientProfileScreen} />
    </PatientProfileStack.Navigator>
  );
};

const PredictStack = createNativeStackNavigator();

const PredictStackScreen = () => {

  return (
    <PredictStack.Navigator
      initialRouteName="PredictInputScreen"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}>
        <PredictStack.Screen name="PredictInputScreen" component={PredictInputScreen} />
        <PredictStack.Screen name="PredictResultScreen" component={PredictResultScreen} />
    </PredictStack.Navigator>
  );
};

const SettingsStack = createNativeStackNavigator();

const SettingsStackScreen = () => {

  return (
    <SettingsStack.Navigator
      initialRouteName="SettingsScreen"
      screenOptions={{
        headerShown: false,
        headerBackVisible: false,
      }}>
        <SettingsStack.Screen name="SettingsScreen" component={SettingsScreen} />
        <SettingsStack.Screen name="AboutScreen" component={AboutScreen} />
    </SettingsStack.Navigator>
  );
};

const AppStack = createBottomTabNavigator();

const AppStackScreen = () => {

  return (
    <AppStack.Navigator
    initialRouteName='Home'
    screenOptions={() => ({
      tabBarHideOnKeyboard:true,
      tabBarActiveTintColor: color.White,
      tabBarInactiveTintColor: color.Button,
      tabBarActiveBackgroundColor: color.Button,
      tabBarInactiveBackgroundColor: color.White,
      tabBarStyle: {
        position: 'absolute',
        height: scale(70),
        margin: scale(10),
        borderRadius: scale(30),
        borderTopWidth: 0,
        backgroundColor: color.White,
      },
      tabBarItemStyle: {
        margin: scale(7),
        borderRadius: scale(30),
      },
      tabBarIconStyle: { display: 'none' },      
    })}>
    <AppStack.Screen name="Home" component={HomeScreen} 
      options={({navigation}) => ({
        tabBarLabel: ({ color }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IC_Home color={color} size={24}/>
              <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(14), color:color}}>{'Home'}</Text>
            </View>
          );
        },
        headerTitle: () => <Header navigation={navigation} />,
    })}/>
    <AppStack.Screen name="Predict" component={PredictStackScreen} 
      options={({navigation}) => ({
        tabBarLabel: ({ color }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IC_Predict color={color} size={24}/>
              <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(14), color:color}}>{'Predict'}</Text>
            </View>
          );
        },
        headerTitle: () => <Header navigation={navigation} />,
    })}/>
    <AppStack.Screen name="Patients" component={PatientProfileStackScreen} 
      options={({navigation}) => ({
        tabBarLabel: ({ color }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IC_Folder color={color} size={24}/>
              <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(14), color:color}}>{'Patients'}</Text>
            </View>
          );
        },
        headerTitle: () => <Header navigation={navigation} />,
    })}/>
    <AppStack.Screen name="Settings" component={SettingsStackScreen} 
      options={({navigation}) => ({
        tabBarLabel: ({ color }) => {
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IC_Setting color={color} size={24}/>
              <Text style={{fontFamily: FONT_FAMILY.SemiBold, fontSize: scale(14), color:color}}>{'Settings'}</Text>
            </View>
          );
        },
        headerTitle: () => <Header navigation={navigation} />,
    })}/>
  </AppStack.Navigator>
  );
};

export default AppStackScreen;
