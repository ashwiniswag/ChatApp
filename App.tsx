/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Callback from './src/CallbackScreen';
import LoginScreen from './src/LoginScreen';
import GroupScreen from './src/GroupScreen';
import SplashScreen from './src/SplashScreen';
import OnBoardScreen from './src/OnBoardScreen';
import ChatScreen from './src/ChatScreen';
import RegisterScreen from './src/RegisterScreen';
import NewGroup from './src/CreateGroupScreen';

const Stack = createNativeStackNavigator();


function App(): JSX.Element {

  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="OnBoard" component={OnBoardScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} options={{ headerShown: false }} />
          <Stack.Screen name="GroupScreen" component={GroupScreen} options={{ headerShown: false }} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen 
            name="NewGroupSCreen" 
            component={NewGroup} 
            options={{
              title: 'Create New Group', // Set the title of the screen
              headerStyle: {
                backgroundColor: '#A4DC5D', // Set the background color of the title bar
              },
              headerTintColor: '#ffffff', // Set the color of the title text
              headerTitleStyle: {
                fontSize: 25, // Set the font size of the title text
              }
            }}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({});

export default App;
