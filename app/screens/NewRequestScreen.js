import React, { useState, useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
//import useLocation from "../hooks/useLocation";

import { db, auth, getCars } from "../api/firebase";
import AppPicker from "../components/AppPicker";
import CarPicker from "../components/CarPicker";
import PickerItem from "../components/PickerItem";
import { arrayUnion, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import AppText from "../components/AppText";

const validationSchema = Yup.object().shape({
  car: Yup.object().nullable().required().label("Car"),
  description: Yup.string().label("Description"),
  category: Yup.string().required().label("Category"),
  images: Yup.array(),
});

const categories = [
  {
    label: "Inspection",
    value: 1,
  },
  {
    label: "Diagnostics",
    value: 2,
  },
  {
    label: "Maintenance",
    value: 3,
  },
  {
    label: "Brakes",
    value: 4,
  },
  {
    label: "Suspension",
    value: 5,
  },
  {
    label: "Direction",
    value: 6,
  },
  {
    label: "Tyres-Wheels",
    value: 7,
  },
  {
    label: "Engine",
    value: 8,
  },
  {
    label: "Ac and heating",
    value: 9,
  },
  {
    label: "Body work",
    value: 10,
  },
  {
    label: "Paint",
    value: 11,
  },
];

function ListingEditScreen({ navigation }) {
  const [coordsX, setCoordsX] = useState(26.10401); //longitude
  const [coordsY, setCoordsY] = useState(44.42946); //latitude
  const [cars, setCars] = useState([]);
  useEffect(() => {
    //console.log("apeleaza getCarsfromdatabase");
    getDataFromDatabase();
    getLocation();
  }, []);
  useEffect(() => {}, [coordsX, coordsY]);

  const handleSubmit = async (listing, { resetForm }) => {
    let today = new Date().toISOString().slice(0, 16);

    var imagesUrl = [];
    for (let i = 0; i < listing.images.length; i++) {
      const imageRef =
        auth.currentUser.email +
        "/requestsphotos/" +
        today +
        "/" +
        listing.car.make +
        listing.model +
        listing.vinNumber +
        today +
        "--" +
        (i + 1) +
        ".jpg";
      const storage = getStorage();
      const storageRef = ref(storage, imageRef);

      const metadata = {
        contentType: "image/jpeg",
      };

      const img = await fetch(listing.images[i]);
      const bytes = await img.blob();

      await uploadBytes(storageRef, bytes, metadata).then((snapshot) => {
        console.log("Uploaded the image no" + i);
      });

      const gettingUrl = await getDownloadURL(storageRef);
      const imageUrl = gettingUrl;
      imagesUrl = [...imagesUrl, imageUrl];
    }

    var time = new Date();

    var datestring =
      time.getDate() +
      "-" +
      (time.getMonth() + 1) +
      "-" +
      time.getFullYear() +
      " " +
      time.getHours() +
      ":" +
      time.getMinutes();
    var docName = listing.car.vinNumber + datestring;
    console.log(docName);
    var data = {
      timeadded: datestring,
      owner: auth.currentUser.email,
      details: listing.description,
      category: listing.category,
      imagesNumber: imagesUrl.length,
      images: imagesUrl,
      offers: [],
      services: [],
      carImage: listing.car.carImageUrl,
      carYear: listing.car.year,
      carVinNumber: listing.car.vinNumber,
      carMake: listing.car.make,
      carModel: listing.car.model,
      done: false,
      canceled: false,
      lat: coordsY,
      lng: coordsX,
      scheduled: false,
    };
    setDoc(doc(db, "ServiceRequests", docName), data)
      .then(() => {
        console.log("Cerere adăugată");
      })
      .catch((error) => {
        alert(error.message);
      });

    resetForm();
    navigation.pop();
  };

  const getDataFromDatabase = async () => {
    const result = await getCars(auth.currentUser.email);
    //console.log("cica am incarcat");
    setCars(result);
    // console.log(cars);
  };

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (!status) return;
    const {
      coords: { latitude, longitude },
    } = await Location.getLastKnownPositionAsync({});

    setCoordsX(longitude);
    setCoordsY(latitude);
  };

  return (
    <Screen style={styles.container}>
      <AppForm
        initialValues={{
          category: "",
          car: null,
          images: [],
          description: "",
        }}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      >
        <FormImagePicker name="images" />
        <AppPicker
          items={categories}
          name="category"
          PickerItemComponent={PickerItem}
          placeholder="Category"
          width="70%"
        />
        <CarPicker
          items={cars}
          name="car"
          PickerItemComponent={PickerItem}
          placeholder="Select a car"
          width="70%"
        />
        <AppFormField
          maxLength={255}
          multiline
          name="description"
          numberOfLines={3}
          placeholder="Description"
        />

        <SubmitButton title="Create" backgroundcolor="secondary" />
      </AppForm>
      <AppText style={{ textAlign: "center", fontSize: 15, marginBottom: 3 }}>
        Select location to get offers from shops nearby (long press the pin to
        move)
      </AppText>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: coordsY,
          longitude: coordsX,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          draggable
          coordinate={{ latitude: coordsY, longitude: coordsX }}
          onDragEnd={(e) => {
            setCoordsX(parseFloat(e.nativeEvent.coordinate.longitude));
            setCoordsY(parseFloat(e.nativeEvent.coordinate.latitude));
          }}
        />
      </MapView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  map: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
});
export default ListingEditScreen;
