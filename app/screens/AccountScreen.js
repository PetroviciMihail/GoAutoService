import React from "react";
import { StyleSheet, View } from "react-native";
import { auth } from "../api/firebase";
import { ListItem2 } from "../components/lists";
import colors from "../config/colors";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

function AccountScreen({ navigation }) {
  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("LogIn");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Screen>
      <View style={styles.container}>
        <ListItem2
          title={auth.currentUser.displayName}
          subTitle={auth.currentUser.email}
          image={require("../assets/logo.png")}
          viewstyle={{
            borderColor: colors.dark,
            borderWidth: 2,
            borderRadius: 10,
          }}
        />
      </View>
      <View style={styles.container}>
        <AppButton
          title="Edit Account Details"
          onPress={() => {
            navigation.push("EditAccount");
          }}
          color="light"
          style={{
            width: "80%",
            alignSelf: "center",
            position: "absolute",
            bottom: 110,
          }}
        />
        <AppButton
          title="Log out"
          onPress={handleSignOut}
          color="secondary"
          style={{
            width: "80%",
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
          }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
});

export default AccountScreen;
