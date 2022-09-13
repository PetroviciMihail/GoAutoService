import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem2 } from "../components/lists";
import AppButton from "../components/AppButton";
import InfoListItem from "../components/lists/InfoListItem";

function MyCarDetailsScreen({ route, navigation }) {
  const car = route.params;

  return (
    <Screen style={styles.container}>
      {car.carImageUrl ? (
        <Image style={styles.image} source={{ uri: car.carImageUrl }} />
      ) : null}
      <InfoListItem title={"Make"} info={car.make} />
      <InfoListItem title={"Model"} info={car.model} />
      <InfoListItem title={"Vin number"} info={car.vinNumber} />
      <InfoListItem title={"Year"} info={car.year} />
      <InfoListItem title={"Details"} info={car.extraDetails} />

      <AppButton
        title="History and statistics"
        color="secondary"
        onPress={() => {
          navigation.navigate("Statistics", car);
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { padding: 5 },
  titleTag: {
    paddingTop: 15,
    backgroundColor: "#eef2e1",
    width: "100%",
    padding: 5,
    fontSize: 22,
    textAlign: "center",
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
    margin: 5,
  },
  imagesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MyCarDetailsScreen;
