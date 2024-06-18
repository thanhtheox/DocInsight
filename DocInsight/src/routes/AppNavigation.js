import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import useAxiosPrivate from '../hooks/useAxiosPrivate';
import HomeScreen from '../screens/app/home';
import PatientProfileListScreen from '../screens/app/patientProfile/patientProfileList';
import Header from '../components/header';


const AppStack = createNativeStackNavigator();

const AppStackScreen = () => {

  return (
    <AppStack.Navigator
      initialRouteName="PatientProfileListScreen"
      screenOptions={{
        headerShown: true,
        headerBackVisible: false,
      }}>
        <AppStack.Screen name="HomeScreen" component={HomeScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Header navigation={navigation} />,
        })}/>
        <AppStack.Screen name="PatientProfileListScreen" component={PatientProfileListScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Header navigation={navigation} />,
        })}/>
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
