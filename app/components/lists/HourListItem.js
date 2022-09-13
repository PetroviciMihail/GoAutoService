import React from "react";
import { View, StyleSheet } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import colors from "../../config/colors";
import AppText from "../AppText";
function HourListItem({ schedule, hour, onPress, selectedHour }) {
  return (
    <View
      style={{
        backgroundColor:
          hour === selectedHour
            ? "lightblue"
            : schedule[hour].reserved === "reserved" ||
              schedule[hour].reserved === "own"
            ? "orange"
            : colors.brigthGreen,
        width: "90%",
        margin: 2,
        padding: 10,
        borderColor: colors.medium,
        borderWidth: 2,
        borderRadius: 10,
        alignSelf: "center",
      }}
    >
      <TouchableWithoutFeedback onPress={onPress}>
        <AppText>
          {hour}:00{" "}
          {schedule[hour].reserved === "reserved"
            ? "Reserved"
            : hour === selectedHour
            ? "Selected"
            : "Tap to reserve"}
        </AppText>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default HourListItem;
