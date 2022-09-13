import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";

import AccountNavigator from "./AccountNavigator";

import MyCarsNavigator from "./MyCarsNavigator";
import MyRequestsNavigator from "./MyRequestsNavigator";
import MyAppointmentsNavigator from "./MyAppointmentsNavigator";

const Tab = createBottomTabNavigator();

function AppNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="My requests"
        component={MyRequestsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="request-quote" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Appointments"
        component={MyAppointmentsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="clipboard-check-outline"
              color={color}
              size={size}
            />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="My cars"
        component={MyCarsNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="car" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />

      <Tab.Screen
        name="My Account"
        component={AccountNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default AppNavigator;
