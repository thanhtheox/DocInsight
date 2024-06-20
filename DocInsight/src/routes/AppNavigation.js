import React from 'react';
import { Text, View } from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/app/home';
import PatientProfileListScreen from '../screens/app/patientProfile/patientProfileList';
import PatientProfileDetailsScreen from '../screens/app/patientProfile/patientProfileDetails';
import AddPatientProfileScreen from '../screens/app/patientProfile/addPatientProfile';
import EditPatientProfileScreen from '../screens/app/patientProfile/editPatientProfile';
import SettingsScreen from '../screens/app/settings';
import Header from '../components/header';
import color from '../constants/color';
import { IC_Folder, IC_Home, IC_Setting } from '../assets/icons';
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
        margin: scale(10),
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
    <AppStack.Screen name="Settings" component={SettingsScreen} 
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
