import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import AppointmentDetailsScreen from "../screens/AppointmentDetailsScreen";
import AppointmentsScreen from "../screens/AppointmentsScreen";

const Stack = createStackNavigator();

function MyAppointmentNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyAppoiments"
        component={AppointmentsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
export default MyAppointmentNavigator;
