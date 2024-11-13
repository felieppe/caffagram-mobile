import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomePage from './src/pages/HomePage';       
import Register from './src/pages/Register'; 
import PostView from './src/pages/PostView'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>  
      <Stack.Navigator initialRouteName="Home"> 
        <Stack.Screen 
          name="Home" 
          component={HomePage} 
          options={{ title: 'Inicio' }}  
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterPage} 
          options={{ title: 'Registro de Usuario' }}  
        />
        <Stack.Screen 
          name="PostView" 
          component={PostView} 
          options={{ title: 'Detalles del Post' }} 
        />
      </Stack.Navigator>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
