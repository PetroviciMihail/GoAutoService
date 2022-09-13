import React from "react";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import AppNavigator from "./AppNavigator";
import { createStackNavigator } from "@react-navigation/stack";
import MyCarsScreen from "../screens/MyCarsScreen";
import MyCarDetailsScreen from "../screens/MyCarDetailsScreen";
import NewCarScreen from "../screens/NewCarScreen";
import CarStatisticsScreen from "../screens/CarStatisticsScreen";
import HistoryDetailsScreen from "../screens/HistoryDetailsScreen";
import RatingScreen from "../screens/RatingScreen";

const Stack = createStackNavigator();

function MyCarsNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyCars"
        component={MyCarsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewCar"
        component={NewCarScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Details"
        component={MyCarDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Statistics"
        component={CarStatisticsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistoryDetails"
        component={HistoryDetailsScreen}
        options={{ title: "Details" }}
      />
      <Stack.Screen
        name="GiveRating"
        component={RatingScreen}
        options={{ title: "Service Review" }}
      />
    </Stack.Navigator>
  );
}
export default MyCarsNavigator;
