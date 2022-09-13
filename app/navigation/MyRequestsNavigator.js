import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import ServiceRequestScreen from "../screens/ServiceRequestScreen";
import NewRequestScreen from "../screens/NewRequestScreen";
import RequestDetailsScreen from "../screens/RequestDetailsScreen";
import ServiceDetailsScreen from "../screens/ServiceDetailsScreen";
import ServiceScheduleScreen from "../screens/ServiceScheduleScreen";

const Stack = createStackNavigator();

function MyRequestsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyRequests"
        component={ServiceRequestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewRequest"
        component={NewRequestScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Detalii"
        component={RequestDetailsScreen}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="ServiceDetails"
        component={ServiceDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        options={{ title: "Service Schedule" }}
        name="ServiceSchedule"
        component={ServiceScheduleScreen}
      />
    </Stack.Navigator>
  );
}
export default MyRequestsNavigator;
