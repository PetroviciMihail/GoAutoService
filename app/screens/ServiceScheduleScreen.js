import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, ScrollView, FlatList } from "react-native";
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import { auth, getServiceSchedule } from "../api/firebase";
import AppText from "../components/AppText";
import HourListItem from "../components/lists/HourListItem";
import Constants from "expo-constants";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../api/firebase";
import colors from "../config/colors";
import AppButton from "../components/AppButton";
const hours = [
  { hour: 8 },
  { hour: 9 },
  { hour: 10 },
  { hour: 11 },
  { hour: 12 },
  { hour: 13 },
  { hour: 14 },
  { hour: 15 },
  { hour: 16 },
  { hour: 17 },
  { hour: 18 },
];
function ServiceScheduleScreen({ route, navigation }) {
  var { service, offer } = route.params;
  const [dateSelected, setDateSelected] = useState(null);
  const [hourSelected, setHourSelected] = useState(null);
  const [schedule, setSchedule] = useState();
  const [loaded, setLoaded] = useState(0);
  useEffect(() => {
    getServiceScheduleFromDB();
  }, [dateSelected]);

  const getServiceScheduleFromDB = async () => {
    const result = await getServiceSchedule(service.owner, dateSelected);
    console.log(result);
    setSchedule(result);
    setHourSelected(null);
    setLoaded(1);
  };

  const reserveHour = () => {
    var data = {};
    data[hourSelected] = {
      reserved: "reserved",
      client: auth.currentUser.email,
      carVinNumber: offer.carVinNumber,
      offerData: offer.data,
      requestTimeAdded: offer.timeadded,
    };

    updateDoc(
      doc(
        db,
        "ServiceAccountsDetails",
        service.owner,
        "calendar",
        dateSelected
      ),
      data
    )
      .then(() => {
        console.log(
          "date doc updated for " +
            service.owner +
            " date: " +
            dateSelected +
            " hour" +
            hourSelected
        );
      })
      .catch((error) => {
        alert(error.message);
      });

    updateRequest();
    saveAppoitement(hourSelected);
  };

  const updateRequest = () => {
    var docName = offer.carVinNumber + offer.timeadded;
    var data = {
      scheduled: true,
    };
    updateDoc(doc(db, "ServiceRequests", docName), data)
      .then(() => {
        console.log("Request scheduled");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const saveAppoitement = (hour) => {
    var docName = offer.carVinNumber + offer.timeadded;
    var data = {
      serviceName: service.name,
      serviceAdress: service.adress,
      serviceMail: service.owner,
      price: offer.price,
      requestDocName: offer.carVinNumber + offer.timeadded,
      date: dateSelected,
      hour: hour,
      km: 0,
      done: false,
      carVinNumber: offer.carVinNumber,
      canceled: false,
      docName: docName,
    };
    setDoc(
      doc(
        db,
        "ClientsAccountDetails",
        auth.currentUser.email,
        "appoitments",
        docName
      ),
      data
    )
      .then(() => {
        console.log("appoitment added");
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Calendar
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={Date.now()}
        // Handler which gets executed on day press. Default = undefined
        onDayPress={(day) => {
          var date = new Date(day.dateString);
          if (date.getDay() != 0 && date.getDay() != 6) {
            setLoaded(0);
            setDateSelected(day.dateString);
            console.log(day);
            console.log("selected day", day);
          }
        }}
        hideExtraDays={true}
        // Month format in calendar title. Formatting values: http://arshaw.com/xdate/#Formatting
        monthFormat={"yyyy MM"}
        // Handler which gets executed when visible month changes in calendar. Default = undefined
        onMonthChange={(month) => {
          console.log("month changed", month);
        }}
        // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
        firstDay={1}
        // Handler which gets executed when press arrow icon left. It receive a callback can go back month
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        // Handler which gets executed when press arrow icon right. It receive a callback can go next month
        onPressArrowRight={(addMonth) => addMonth()}
        // Disable all touch events for disabled days. can be override with disableTouchEvent in markedDates
        disableAllTouchEventsForDisabledDays={true}
        // Enable the option to swipe between months. Default = false
        enableSwipeMonths={true}
      />
      {dateSelected && loaded ? (
        <FlatList
          contentContainerStyle={{
            flexGrow: 1,
            paddingTop: 5,
          }}
          data={hours}
          keyExtractor={(item) => item.hour.toString()}
          numColumns={1}
          renderItem={({ item }) => (
            <HourListItem
              schedule={schedule}
              hour={item.hour}
              selectedHour={hourSelected}
              onPress={() => {
                if (
                  !(
                    schedule[item.hour].reserved === "reserved" ||
                    schedule[item.hour].reserved === "own"
                  )
                )
                  setHourSelected(item.hour);
              }}
            />
          )}
        />
      ) : (
        <AppText style={{ textAlign: "center", marginTop: 40 }}>
          Select a date to see the hourly schedule
        </AppText>
      )}
      {hourSelected && (
        <AppButton
          title="Confirm"
          color="secondary"
          onPress={() => {
            reserveHour();
            alert("Apoitment added!");
            navigation.navigate("MyRequests");
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundColor,
    padding: 5,
    flex: 1,
  },
});

export default ServiceScheduleScreen;
