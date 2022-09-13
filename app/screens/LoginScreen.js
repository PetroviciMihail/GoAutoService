import { useNavigation } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, Image, Text, View } from "react-native";
import * as Yup from "yup";
import { auth } from "../api/firebase";
import AppButton from "../components/AppButton";

import { AppForm, AppFormField, SubmitButton } from "../components/forms";
import Screen from "../components/Screen";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(4).label("Password"),
});

function LoginScreen(props) {
  const navigation = useNavigation();

  const handleRegister = () => {
    navigation.push("Register");
  };
  useEffect(() => {
    if (auth.currentUser != null) navigation.replace("App");
  }, []);

  handleLogIn = (values) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        navigation.replace("App");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo.png")} />

      <Text style={styles.title}>GoAutoService</Text>

      <AppForm
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => handleLogIn(values)}
        validationSchema={validationSchema}
      >
        <AppFormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
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
        <SubmitButton title="Log in" backgroundcolor="secondary" />
      </AppForm>
      <AppButton title="Register" color="medium" onPress={handleRegister} />
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
  title: {
    textAlign: "center",
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 40,
  },
});

export default LoginScreen;
