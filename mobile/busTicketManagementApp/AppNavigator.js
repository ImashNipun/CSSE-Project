import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LoginComponent from './pages/LoginComponent';
import SignUpComponent from './pages/SignUpComponent';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
// import JourneyHistory from './pages/JourneyHistory';
import PlanAJourney from './pages/PlanAJourney';
import ChoicePage from './pages/ChoicePage';
import ForeignerSignUp from './pages/ForeignerSignUp';
import ForeignLoginComponent from './pages/ForeignLoginComponent';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Choice">
      <Stack.Screen  name="Login" component={LoginComponent} />
      <Stack.Screen name="SignUp" component={SignUpComponent} />
      <Stack.Screen name="Home" component={HomePage} />
      <Stack.Screen name="Profile" component={ProfilePage} />
      {/* <Stack.Screen name="History" component={JourneyHistory} /> */}
      <Stack.Screen name="Planning" component={PlanAJourney} />
      <Stack.Screen name="Choice" component={ChoicePage} />
      <Stack.Screen name="ForeignSignUp" component={ForeignerSignUp} />
      <Stack.Screen name="ForeignLogin" component={ForeignLoginComponent} />
    </Stack.Navigator>
  );
}
const styles = StyleSheet.create({
    screenHeaders:{
        backgroundColor: '#B8EAFF',
    }
});
