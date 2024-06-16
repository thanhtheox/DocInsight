import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// import useAxiosPrivate from '../hooks/useAxiosPrivate';
import OnboardingScreen from '../screens/onboarding';


const AppStack = createNativeStackNavigator();

const AppStackScreen = () => {
//   const user = useSelector(state => state.user);
//   const {userItems} = user;
//   const userInfo = userItems.user;
//   const axiosPrivate = useAxiosPrivate();
//   const dispatch = useDispatch();
//   const cart = useSelector(state => state.cart);
//   const {cartItems} = cart;
//   const {cartId} = cart;

  return (
    <AppStack.Navigator
      initialRouteName="OnboardingScreen"
      screenOptions={{headerShown: false}}>
      {/* {userInfo.emailVerified === true ? (
        <>
          <AppStack.Screen
            name="AppStackWithVerifyScreen"
            component={AppStackWithVerifyScreen}
          />
        </>
      ) : ( */}
        <AppStack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      {/* )} */}
    </AppStack.Navigator>
  );
};

export default AppStackScreen;
