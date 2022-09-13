import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import * as Yup from "yup";
import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { db, auth } from "../api/firebase";

const validationSchema = Yup.object().shape({
  clientName: Yup.string().required().min(2).label("Name"),
  clientPhone: Yup.string()
    .required()
    .matches(
      /^((\\+[0-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/,
      "Invalid Phone number"
    ),
});

function AccountEditScreen({ navigation }) {
  const [loaded, setloaded] = useState(0);
  var initialValues = {
    clientName: "",
    clientPhone: "",
  };
  useEffect(() => {
    getAccountDetails();
  }, []);
  const getAccountDetails = async () => {
    const docSnap = await getDoc(
      doc(db, "ClientsAccountDetails", auth.currentUser.email)
    );

    if (docSnap.exists()) {
      initialValues.clientName = docSnap.data().clientName;
      initialValues.clientPhone = docSnap.data().clientPhone;
    }
    setloaded(loaded + 1);
  };
  const handleUpdate = async (values) => {
    console.log("updating");
    navigation.pop();
    console.log(values);

    var data = {
      clientName: values.clientName,
      clientPhone: values.clientPhone,
    };
    setDoc(doc(db, "ClientsAccountDetails", auth.currentUser.email), data)
      .then(() => {
        console.log("ClientAccountDetails updated");
      })
      .catch((error) => {
        alert(error.message);
      });

    auth.currentUser.updateProfile({
      displayName: values.clientName,
    });
  };
  return (
    <Screen style={styles.container}>
      <AppForm
        enableReinitialize={true}
        initialValues={initialValues}
        onSubmit={handleUpdate}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="polaroid"
          name="clientName"
          placeholder={"Name"}
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="phone"
          name="clientPhone"
          placeholder="Phone number"
          textContentType="telephoneNumber"
          keyboardType="phone-pad"
        />
        <SubmitButton title="Save" backgroundcolor="medium" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default AccountEditScreen;
