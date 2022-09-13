import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Modal,
  Button,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFormikContext } from "formik";

import AppText from "./AppText";
import defaultStyles from "../config/styles";
import PickerItem from "./PickerItem";
import Screen from "./Screen";
import { ErrorMessage } from "./forms";

function CarPicker({
  icon,
  items,
  name,
  numberOfColumns = 1,
  PickerItemComponent,
  placeholder,
  width = "100%",
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();
  const car = values[name];
  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {icon && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={defaultStyles.colors.medium}
              style={styles.icon}
            />
          )}
          {car ? (
            <AppText style={styles.text}>{car.make + " " + car.model}</AppText>
          ) : (
            <AppText style={styles.placeholder}>{placeholder}</AppText>
          )}

          <MaterialCommunityIcons
            name="chevron-down"
            size={20}
            color={defaultStyles.colors.medium}
          />
        </View>
      </TouchableWithoutFeedback>
      <ErrorMessage error={errors[name]} visible={touched[name]} />
      <Modal visible={modalVisible} animationType="slide">
        <Screen>
          <Button title="Close" onPress={() => setModalVisible(false)} />
          <FlatList
            data={items}
            keyExtractor={(item) => item.vinNumber}
            numColumns={numberOfColumns}
            renderItem={({ item }) => (
              <PickerItemComponent
                label={item.make + " " + item.model}
                onPress={() => {
                  setFieldValue(name, item);
                  setModalVisible(false);
                  //setFieldTouched(name);
                }}
              />
            )}
          />
        </Screen>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: defaultStyles.colors.light,
    borderRadius: 25,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: defaultStyles.colors.medium,
    flex: 1,
  },
  text: {
    flex: 1,
  },
});

export default CarPicker;
