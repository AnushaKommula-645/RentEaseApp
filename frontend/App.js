import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from "@react-navigation/stack";
import LandingScreen from "./screens/landingScreen";
import SignupScreen from "./screens/signupScreen";
import LoginScreen from "./screens/loginScreen";
import HiScreen from "./screens/hiScreen";
//import AdminScreen from "./screens/adminScreen";
import HomeScreen from "./screens/homeScreen";
//import UserAccountScreen from "./screens/userAccountScreen";


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LandingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HiScreen" component={HiScreen} />
        {/* <Stack.Screen name="AdminScreen" component={AdminScreen} /> */}
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        {/* <Stack.Screen name="UserAccountScreen" component={UserAccountScreen} /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}
