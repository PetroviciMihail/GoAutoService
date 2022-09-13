import React, { useState, useEffect } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";

import { ListItem, ListItem2 } from "../components/lists";
import AppText from "../components/AppText";
import colors from "../config/colors";

import { getRequestOffers } from "../api/firebase";
import InfoListItem from "../components/lists/InfoListItem";
import CarListItem from "../components/lists/CarListItem";

function RequestDetailsScreen({ route, navigation }) {
  const item = route.params;
  const [price, setPrice] = useState();
  const [offers, setOffers] = useState();
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    console.log("-----------------------------");
    getRequestDetailsFromDB();
  }, []);

  const getRequestDetailsFromDB = async () => {
    const result = await getRequestOffers(item.carVinNumber + item.timeadded);
    console.log(" request details incarcate");
    setOffers(result);
    setLoaded(1);
    console.log(result);
  };

  return (
    <ScrollView style={styles.container}>
      <InfoListItem title={"Category"} info={item.category} />
      <InfoListItem title={"Car"}>
        <CarListItem
          title={item.carMake + " " + item.carModel}
          subTitle={item.carYear}
          image={item.carImage}
          //onPress={navigheaza la car details screen care o sa fie acelasi cu cel din cealalta aplicatie} acolo o sa vada si vin numberul serviceul
        />
      </InfoListItem>
      <InfoListItem
        title={"Details"}
        info={item.details ? item.details : "no details"}
      />
      <InfoListItem title={"Images"}>
        <View style={styles.imagesContainer}>
          {item.imagesNumber ? (
            item.images.map((imageUrl, key) => {
              return (
                <Image
                  style={styles.image}
                  source={{ uri: imageUrl }}
                  key={key}
                />
              );
            })
          ) : (
            <AppText style={styles.missingMessage}>No images</AppText>
          )}
        </View>
      </InfoListItem>
      <InfoListItem title={"Received offers"}>
        <View style={styles.offersContainer}>
          {loaded && item.offers.length ? (
            <View>
              {offers.map((offer, key) => {
                return (
                  <>
                    <ListItem
                      title={offer.price + " lei"}
                      titleStyle={{ color: colors.brigthGreen }}
                      subTitle={offer.serviceName}
                      key={key}
                      onPress={() => {
                        navigation.navigate("ServiceDetails", {
                          serviceMail: offer.serviceMail,
                          offer: offer,
                        });
                      }}
                    />
                  </>
                );
              })}
            </View>
          ) : (
            <AppText style={styles.missingMessage}>no offers yet</AppText>
          )}
        </View>
      </InfoListItem>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  titleTag: {
    backgroundColor: "#eef2e1",
    width: "100%",
    padding: 5,
    fontSize: 22,
    textAlign: "center",
  },
  detailsContainer: {
    marginTop: 5,
    backgroundColor: colors.white,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
  },
  image: {
    resizeMode: "contain",
    width: "100%",
    height: 300,
  },
  imagesContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  offersContainer: {
    justifyContent: "center",
  },
  missingMessage: {
    textAlign: "center",
  },
});

export default RequestDetailsScreen;
