import React from 'react';
import color from './src/constants/color';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { AuthProvider } from './src/context/AuthProvider';
import RootNavigator from './src/routes/RootNavigation';


const App = (props: any) => {
  return (
    <GestureHandlerRootView style={{ backgroundColor: color.White, flex: 1 }}>
      <AuthProvider>
        <RootNavigator {...props} />
      </AuthProvider>
    </GestureHandlerRootView>
  );
}
export default App;
