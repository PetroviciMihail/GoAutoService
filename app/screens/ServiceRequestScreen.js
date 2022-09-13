import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList, ScrollView } from "react-native";
import Constants from "expo-constants";
import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { useIsFocused } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

import colors from "../config/colors";
import { db, auth, storage, getRequests } from "../api/firebase";

import RequestListItem from "../components/lists/RequestListItem";
import { ListItemDeleteAction } from "../components/lists";

function ServiceRequestScreen({ navigation }) {
  //const getListingsApi = useApi(listingsApi.getListings);
  const [requestsdata, setrequestsData] = useState([]);
  const isFocused = useIsFocused();
  //console.log("am reincarcat toata faza");
  useEffect(() => {
    const q = query(
      collection(db, "ServiceRequests"),
      where("owner", "==", auth.currentUser.email)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      var newdata = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().scheduled === false) newdata.push(doc.data());
      });
      setrequestsData(newdata);
      console.log(newdata);
    });
    return unsubscribe;
  }, [isFocused]);

  const deleteRequest = async (item) => {
    console.log("am sters requestul");
    console.log(item);
    var docName = item.carVinNumber + item.timeadded;
    await deleteDoc(doc(db, "ServiceRequests", docName));
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>My requests</AppText>
      {requestsdata.length ? (
        <View style={{ flex: 1 }}>
          <ScrollView>
            <FlatList
              data={requestsdata}
              keyExtractor={(item) => item.timeadded}
              renderItem={({ item }) => (
                <RequestListItem
                  category={item.category}
                  title={item.carMake + " " + item.carModel}
                  image={item.images[0]}
                  subTitle={"Offers: " + item.offers.length}
                  onPress={() => {
                    navigation.navigate("Detalii", item);
                  }}
                  renderRightActions={() => (
                    <ListItemDeleteAction
                      onPress={() => {
                        deleteRequest(item);
                      }}
                    />
                  )}
                  subtitleStyle={
                    item.offers.length
                      ? { color: colors.brigthGreen }
                      : { color: colors.danger }
                  }
                />
              )}
            />
          </ScrollView>
        </View>
      ) : (
        <AppText style={styles.missingMessage}>No request created</AppText>
      )}

      <AppButton
        title="Create new request"
        onPress={() => navigation.push("AddNewRequest")}
        color="secondary"
        style={styles.addbutton}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: colors.backgroundColor,
    padding: 5,
    flex: 1,
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

export default ServiceRequestScreen;
