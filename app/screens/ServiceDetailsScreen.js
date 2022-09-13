import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import AppButton from "../components/AppButton";
import { getRating, getServiceDetails } from "../api/firebase";
import AppText from "../components/AppText";
import { ListItem2 } from "../components/lists";
import Screen from "../components/Screen";
import MapView, { Marker } from "react-native-maps";
import StarRating from "react-native-star-rating";
import openMap from "react-native-open-maps";
import colors from "../config/colors";
import InfoListItem from "../components/lists/InfoListItem";

function ServiceDetailsScreen({ route, navigation }) {
  const { serviceMail, offer } = route.params;

  const [service, setService] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [rating, setRating] = useState(0);
  useEffect(() => {
    getServiceDetailsfromDB();
  }, []);

  const getServiceDetailsfromDB = async () => {
    const result = await getServiceDetails(serviceMail);
    setService(result);
    console.log(service);
    const stars = await getRating(serviceMail);
    setRating(stars);
    console.log("----------------------rating");
    console.log(stars);
    setLoaded(1);
  };
  return (
    <Screen>
      {loaded ? (
        <>
          <InfoListItem title={"Service name"} info={service.name} />
          <InfoListItem title={"Adress"} info={service.adress} />
          <InfoListItem title={"Email"} info={service.owner} />
          <InfoListItem title={"Phone number"} info={service.phone} />
          <InfoListItem title={"Reviews"}>
            <View
              style={{
                width: "65%",
                alignSelf: "center",
                padding: 10,
              }}
            >
              <StarRating disabled maxStars={5} rating={rating} starSize={25} />
            </View>
          </InfoListItem>

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
          <AppButton
            color="secondary"
            title={"Schedule an appointment"}
            onPress={() => {
              navigation.push("ServiceSchedule", {
                service: service,
                offer: offer,
              });
            }}
          />
        </>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, width: "100%" },
  map: {
    height: 300,
    width: "100%",

    borderRadius: 10,
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

export default ServiceDetailsScreen;
