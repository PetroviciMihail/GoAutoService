import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";

import AppText from "../AppText";
import colors from "../../config/colors";

function RequestListItem({
  category,
  title,
  subTitle,
  image,
  IconComponent,
  onPress,
  renderRightActions,
  viewstyle,
  subtitleStyle,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={[styles.container, viewstyle]}>
          {IconComponent}
          {image ? (
            <Image style={styles.image} source={{ uri: image }} />
          ) : (
            <Image
              style={styles.image}
              source={require("../../assets/wrench.png")}
            />
          )}
          <View style={styles.detailsContainer}>
            <AppText style={styles.title} numberOfLines={1}>
              {category}
            </AppText>
            <AppText style={styles.title} numberOfLines={1}>
              {title}
            </AppText>
            {subTitle && (
              <AppText
                style={[styles.subTitle, subtitleStyle]}
                numberOfLines={1}
              >
                {subTitle}
              </AppText>
            )}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
    margin: 2,
    borderRadius: 10,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "400",
    color: colors.text,
  },
  category: {
    fontWeight: "600",
  },
});

export default RequestListItem;
