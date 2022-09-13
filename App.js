import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import LogInNavigator from "./app/navigation/LogInNavigator";

export default function App() {
  return (
    <NavigationContainer>
      <LogInNavigator />
    </NavigationContainer>
  );
}
