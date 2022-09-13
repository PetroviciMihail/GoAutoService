import React, { useEffect, useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import AppText from "../components/AppText";
import { auth, getAppoitment, getServiceDetails } from "../api/firebase";
import Screen from "../components/Screen";
import openMap from "react-native-open-maps";
import { ListItem2 } from "../components/lists";
import MapView, { Marker } from "react-native-maps";
import AppButton from "../components/AppButton";
import InfoListItem from "../components/lists/InfoListItem";
function AppointmentDetailsScreen({ route, navigation }) {
  var request = route.params;
  const [appoitment, setAppoitment] = useState();
  const [service, setService] = useState();
  const [loaded, setLoaded] = useState(0);

  useEffect(() => {
    getAppoitmentDetailsFromDb();
  }, [loaded]);

  const getAppoitmentDetailsFromDb = async () => {
    getAppoitment(
      auth.currentUser.email,
      request.carVinNumber + request.timeadded
    )
      .then((result) => {
        setAppoitment(result);
        return getServiceDetails(result.serviceMail);
      })
      .then((result) => {
        setService(result);
        setLoaded(1);
      });
  };

  return (
    <Screen style={styles.container}>
      {loaded ? (
        <>
          <InfoListItem
            title={"Date and hour"}
            info={appoitment.date + " " + appoitment.hour + ":00"}
          />
          <InfoListItem title={"Offered price"} info={"$" + appoitment.price} />
          <InfoListItem title={"Service name"} info={service.name} />
          <InfoListItem title={"Service Adress"} info={service.adress} />
          <InfoListItem title={"Service Email"} info={service.owner} />
          <InfoListItem title={"Phone Number"} info={service.phone} />

          <InfoListItem title={"Location on map"}>
            <View style={{ borderRadius: 10, overflow: "hidden" }}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: service.lat,
                  longitude: service.lng,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              >
                <Marker
                  coordinate={{ latitude: service.lat, longitude: service.lng }}
                />
              </MapView>
            </View>
          </InfoListItem>
          <AppButton
            color="medium"
            title={"Open in maps"}
            onPress={() => {
              openMap({
                latitude: service.lat,
                longitude: service.lng,
                zoom: 18,
              });
            }}
          />
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  map: {
    height: 300,
    width: "100%",
    resizeMode: "contain",
  },
  titleTag: {
    paddingTop: 15,
    backgroundColor: "#eef2e1",
    width: "100%",
    padding: 5,
    fontSize: 22,
    textAlign: "center",
  },
});

export default AppointmentDetailsScreen;
