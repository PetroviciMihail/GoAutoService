import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppNavigator from "./AppNavigator";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

function LogInNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="LogIn"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "Create new Account" }}
      />
      <Stack.Screen
        name="App"
        component={AppNavigator}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default LogInNavigator;
