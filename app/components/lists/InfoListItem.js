import React from "react";
import { View, StyleSheet, Text } from "react-native";
import colors from "../../config/colors";

function InfoListItem({ title, info, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {info ? <Text style={styles.info}>{info}</Text> : null}
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.secondary,
    padding: 5,
    backgroundColor: colors.white,
    margin: 5,
    borderRadius: 10,
  },
  title: {
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 5,
    color: colors.text,
    fontSize: 20,
  },
  info: {
    color: colors.medium,
    marginLeft: 25,
    marginRight: 25,
    marginBottom: 5,
    fontSize: 18,
    textAlign: "justify",
  },
});

export default InfoListItem;
