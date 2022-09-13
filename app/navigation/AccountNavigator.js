import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AccountScreen from "../screens/AccountScreen";
import AccountEditScreen from "../screens/AccountEditScreen";

const Stack = createStackNavigator();

function AccountNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAccount"
        component={AccountEditScreen}
        options={{ title: "Edit Account Details" }}
      />
    </Stack.Navigator>
  );
}
export default AccountNavigator;
