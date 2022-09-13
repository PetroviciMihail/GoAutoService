import React from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";

import Screen from "../components/Screen";
import FormSingleImagePicker from "../components/forms/FormSingleImagePicker";
import { auth, db } from "../api/firebase";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const validationSchema = Yup.object().shape({
  make: Yup.string().required("Marca este obligatorie").min(1).label("Make"),
  model: Yup.string().required().min(1).label("Model"),
  year: Yup.number().required().min(1900).max(2025).label("Year"),
  extraDetails: Yup.string().nullable().label("Details"),
  vinNumber: Yup.string().required().min(17).label("Vin Number"),
  carImage: Yup.array().label("Image of the car"),
});

function NewCarScreen({ navigation }) {
  const handleSubmit = async (listing) => {
    console.log(listing);
    const imageRef =
      auth.currentUser.email +
      "/cars/" +
      listing.make +
      listing.model +
      listing.vinNumber +
      ".jpg";
    const storage = getStorage();
    const storageRef = ref(storage, imageRef);

    const metadata = {
      contentType: "image/jpeg",
    };

    const img = await fetch(listing.carImage[0]);
    const bytes = await img.blob();

    await uploadBytes(storageRef, bytes, metadata).then((snapshot) => {
      console.log("Uploaded the image!");
    });

    const gettingUrl = await getDownloadURL(storageRef);
    const imageUrl = gettingUrl;

    db.collection("Cars")
      .add({
        owner: auth.currentUser.email,
        make: listing.make,
        model: listing.model,
        year: listing.year,
        vinNumber: listing.vinNumber,
        extraDetails: listing.extraDetails,
        carImage: imageRef,
        carImageUrl: imageUrl,
      })
      .then(() => {
        console.log("Car added");
      })
      .catch((error) => {
        alert(error.message);
      });

    navigation.navigate("MyCars");
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          make: "",
          model: "",
          year: "",
          vinNumber: "",
          extraDetails: null,
          carImage: [],
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormSingleImagePicker name="carImage" />
        <AppFormField maxLength={255} name="make" placeholder="Make" />
        <AppFormField maxLength={255} name="model" placeholder="Model" />
        <AppFormField
          maxLength={255}
          name="vinNumber"
          placeholder="Vin Number"
        />
        <AppFormField
          keyboardType="numeric"
          maxLength={8}
          name="year"
          placeholder="Year"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="extraDetails"
          numberOfLines={3}
          placeholder="Extra details"
        />
        <SubmitButton title="Save" backgroundcolor="secondary" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default NewCarScreen;
