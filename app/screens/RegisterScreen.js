import React from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import { auth } from "../api/firebase";
import { useNavigation } from "@react-navigation/native";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
  name: Yup.string().required().min(2).label("Name"),
});

function RegisterScreen(props) {
  const navigation = useNavigation();
  const handleSignUp = (values) => {
    auth
      .createUserWithEmailAndPassword(values.email, values.password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        user.updateProfile({
          displayName: values.name,
        });
        alert("Account created successfully");
        navigation.navigate("LogIn");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleSignUp(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="polaroid"
          name="name"
          placeholder="Name"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email adress"
          textContentType="emailAddress"
        />
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" backgroundcolor="medium" />
      </AppForm>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default RegisterScreen;
