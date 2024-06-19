import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import useAxiosPrivate from '../hooks/useAxiosPrivate';
import HomeScreen from '../screens/app/home';
import PatientProfileListScreen from '../screens/app/patientProfile/patientProfileList';
import PatientProfileDetailsScreen from '../screens/app/patientProfile/patientProfileDetails';
import AddPatientProfileScreen from '../screens/app/patientProfile/addPatientProfile';
import EditPatientProfileScreen from '../screens/app/patientProfile/editPatientProfile';
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
        <AppStack.Screen name="PatientProfileDetailsScreen" component={PatientProfileDetailsScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Header navigation={navigation} />,
        })}/>
        <AppStack.Screen name="AddPatientProfileScreen" component={AddPatientProfileScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Header navigation={navigation} />,
        })}/>
        <AppStack.Screen name="EditPatientProfileScreen" component={EditPatientProfileScreen} 
          options={({navigation}) => ({
            headerTitle: () => <Header navigation={navigation} />,
        })}/>
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
