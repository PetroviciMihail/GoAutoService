import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Constants from "expo-constants";
import colors from "../config/colors";

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {children}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.backgroundColor,
    padding: 5,
    flex: 1,
  },
});

export default Screen;
