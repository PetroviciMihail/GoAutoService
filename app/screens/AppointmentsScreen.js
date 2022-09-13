import React, { useEffect, useState } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import AppText from "../components/AppText";
import Screen from "../components/Screen";
import { useIsFocused } from "@react-navigation/native";
import { updateDoc, doc, deleteDoc, getDoc } from "firebase/firestore";
import colors from "../config/colors";
import { db, auth, getRequestsScheduled } from "../api/firebase";

import RequestListItem from "../components/lists/RequestListItem";
import { ListItemDeleteAction } from "../components/lists";

function AppointmentsScreen({ navigation }) {
  //const getListingsApi = useApi(listingsApi.getListings);
  const [requestsdata, setrequestsData] = useState([]);
  const isFocused = useIsFocused();

  //console.log("am reincarcat toata faza");
  useEffect(() => {
    console.log("-----------------------------");
    getServiceRequestFromDB();
  }, [isFocused]);

  const getServiceRequestFromDB = async () => {
    const result = await getRequestsScheduled(auth.currentUser.email);
    console.log("service requests incarcate");
    setrequestsData(result);
    console.log(requestsdata);
  };
  const deleteAppointment = async (item) => {
    console.log(item);
    var docName = item.carVinNumber + item.timeadded;
    var data = { scheduled: false };
    await updateDoc(doc(db, "ServiceRequests", docName), data);
    var docSnap = await getDoc(
      doc(
        db,
        "ClientsAccountDetails",
        auth.currentUser.email,
        "appoitments",
        docName
      )
    );
    if (docSnap.exists()) {
      var appointment = docSnap.data();
      console.log("appointment");
      console.log(appointment);
      var data = {};
      data[appointment.hour] = {
        reserved: "canceled",
      };

      updateDoc(
        doc(
          db,
          "ServiceAccountsDetails",
          appointment.serviceMail,
          "calendar",
          appointment.date
        ),
        data
      )
        .then(() => {
          console.log(
            "date doc updated for " +
              appointment.serviceMail +
              " date: " +
              appointment.date +
              " hour" +
              appointment.hour
          );
        })
        .catch((error) => {
          alert(error.message);
        });
    }
    await deleteDoc(
      doc(
        db,
        "ClientsAccountDetails",
        auth.currentUser.email,
        "appoitments",
        docName
      )
    );
    getServiceRequestFromDB();
  };

  return (
    <Screen style={styles.container}>
      <AppText style={styles.title}>My Appointments</AppText>
      {requestsdata.length ? (
        <View style={{ flex: 1 }}>
          <FlatList
            data={requestsdata}
            keyExtractor={(item) => item.timestamp}
            renderItem={({ item }) => (
              <RequestListItem
                category={item.category}
                title={item.carMake + " " + item.carModel}
                image={item.images[0]}
                subTitle={
                  !item.scheduled
                    ? "Offers: " + item.offers.length
                    : "Scheduled"
                }
                onPress={() => {
                  navigation.navigate("AppointmentDetails", item);
                }}
                renderRightActions={() => (
                  <ListItemDeleteAction
                    onPress={() => {
                      deleteAppointment(item);
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
        </View>
      ) : (
        <AppText style={styles.missingMessage}>No appointments </AppText>
      )}
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

export default AppointmentsScreen;
