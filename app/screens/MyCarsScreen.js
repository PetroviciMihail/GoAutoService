import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { collection, query, where, getDocs } from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import colors from "../config/colors";
import { db, auth, storage, getCars } from "../api/firebase";

import CarListItem from "../components/lists/CarListItem";
import { ListItemDeleteAction } from "../components/lists";

function MyCarsScreen({ navigation }) {
  //const getListingsApi = useApi(listingsApi.getListings);
  const [cars, setCars] = useState([]);

  useEffect(() => {
    console.log("-----------------------------");
    getDataFromDatabase();
  }, []);

  const getDataFromDatabase = async () => {
    const result = await getCars(auth.currentUser.email);
    console.log("cars incarcate");
    setCars(result);
    console.log(cars);
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>My cars</AppText>
      {cars.length ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={cars}
            keyExtractor={(item) => item.vinNumber}
            renderItem={({ item }) => (
              <CarListItem
                title={item.make + " " + item.model}
                subTitle={item.year}
                image={item.carImageUrl}
                onPress={() => navigation.navigate("Details", item)}
              />
            )}
          />
        </View>
      ) : (
        <AppText style={styles.missingMessage}>No cars added yet</AppText>
      )}
      <AppButton
        title="Add new car"
        onPress={() => navigation.navigate("AddNewCar")}
        color="secondary"
        style={styles.addbutton}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
  },
  title: {
    fontSize: 25,
    paddingTop: 20,
    color: colors.text,
    marginBottom: 15,
    textAlign: "center",
  },
  addbutton: {
    bottom: 10,
  },
  missingMessage: {
    flex: 1,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default MyCarsScreen;
