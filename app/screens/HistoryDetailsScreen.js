import React from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import colors from "../config/colors";
import AppText from "../components/AppText";
import { ListItem2 } from "../components/lists";
import AppButton from "../components/AppButton";
import InfoListItem from "../components/lists/InfoListItem";
function HistoryDetailsScreen({ route, navigation }) {
  const item = route.params;
  console.log("======================din histyory details");
  console.log(item);
  return (
    <ScrollView style={styles.container}>
      <InfoListItem title={"Category"} info={item.category} />
      <InfoListItem
        title={"Details"}
        info={item.details ? item.details : "No details"}
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
      <InfoListItem
        title={"Date and hour of visit"}
        info={item.appoitmentdata.date + " " + item.appoitmentdata.hour + ":00"}
      />
      <InfoListItem
        title={"Price paid"}
        info={"$" + item.appoitmentdata.price}
      />
      <InfoListItem
        title={"Service name"}
        info={item.appoitmentdata.serviceName}
      />

      <AppButton
        title={"Give review"}
        color="medium"
        onPress={() => {
          navigation.push("GiveRating", item.appoitmentdata.serviceMail);
        }}
      />
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
    marginBottom: 15,
  },
  missingMessage: {
    textAlign: "center",
  },
});

export default HistoryDetailsScreen;
