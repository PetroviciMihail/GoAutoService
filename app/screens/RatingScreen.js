import { doc, setDoc } from "firebase/firestore";
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import StarRating from "react-native-star-rating";
import { db, auth } from "../api/firebase";
import AppButton from "../components/AppButton";
import AppTextInput from "../components/AppTextInput";

function RatingScreen({ route, navigation }) {
  const serviceMail = route.params;
  const [text, setText] = useState("");
  const [stars, setStars] = useState("3");
  const saveRating = async () => {
    var data = {
      text: text,
      stars: stars,
    };
    setDoc(
      doc(
        db,
        "ServiceAccountsDetails",
        serviceMail,
        "ratings",
        auth.currentUser.email
      ),
      data
    )
      .then(() => {
        //console.log("Sevice account doc created");
      })
      .catch((error) => {
        alert(error.message);
      });
    navigation.pop();
  };
  return (
    <View style={styles.container}>
      <AppTextInput
        onChangeText={(text) => setText(text)}
        placeholder="Review"
      />
      <View
        style={{
          width: "65%",
          alignSelf: "center",
          padding: 10,
        }}
      >
        <StarRating
          style={{ width: "80%" }}
          maxStars={5}
          rating={stars}
          starSize={25}
          selectedStar={(rating) => {
            setStars(rating);
          }}
        />
      </View>
      <AppButton title="Confirm" color="medium" onPress={saveRating} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,

    flex: 1,
    justifyContent: "center",
  },
});

export default RatingScreen;
