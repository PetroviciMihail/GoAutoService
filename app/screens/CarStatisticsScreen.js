import React, { useEffect, useState } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { auth, db } from "../api/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";
import Screen from "../components/Screen";
import AppText from "../components/AppText";
import { ListItem } from "../components/lists";
import RequestListItem from "../components/lists/RequestListItem";

function CarStatisticsScreen({ route, navigation }) {
  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: "#000000",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#000000",
    backgroundGradientToOpacity: 0.005,
    color: (opacity = 1) => `rgba(0, 62, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
  };
  const car = route.params;
  const [data, setData] = useState({});
  const [graphData, setGrapfData] = useState({});
  const [loaded, setLoaded] = useState(0);
  const [history, sethistory] = useState({});
  const [mean, setMean] = useState(0);
  const [nr, setNr] = useState(0);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    getFromDb();
  }, []);

  const getFromDb = async () => {
    const q = query(
      collection(
        db,
        "ClientsAccountDetails",
        auth.currentUser.email,
        "appoitments"
      ),
      where("carVinNumber", "==", car.vinNumber),
      where("done", "==", true),
      where("canceled", "==", false)
    );

    var newdata = [];
    const querySnapshot = await getDocs(q);
    var sum = 0;
    var k = 0;
    for (const doc of querySnapshot.docs) {
      var itemdata = doc.data();
      sum = sum + parseInt(itemdata.price);
      k++;
      newdata = [...newdata, itemdata];
    }
    if (k > 0) setMean(parseInt(sum / k));
    setNr(k);
    setSum(sum);
    newdata.sort((a, b) => {
      if (a.date < b.date) return -1;
      if (a.date > b.date) return 1;
      return 0;
    });
    setData(newdata);

    console.log("chestii luate din appoitment");
    console.log(newdata);
    var lasttendata = newdata.slice(-5);
    const data2 = {
      labels: lasttendata.map((item) => item.date.substring(5)),
      datasets: [
        {
          data: lasttendata.map((item) => parseInt(item.price)),
          color: (opacity = 1) => `rgba(128, 96, 0, ${opacity})`, // optional
          strokeWidth: 2, // optional
        },
      ],
      legend: ["Cheltuieli"], // optional
    };
    setGrapfData(data2);

    const q2 = query(
      collection(db, "ServiceRequests"),
      where("carVinNumber", "==", car.vinNumber),
      where("done", "==", true),
      where("canceled", "==", false)
    );

    var newdata = [];
    const querySnapshot2 = await getDocs(q2);

    for (const docc of querySnapshot2.docs) {
      var itemdata = docc.data();
      var docName = itemdata.carVinNumber + itemdata.timeadded;
      const docSnap = await getDoc(
        doc(
          db,
          "ClientsAccountDetails",
          auth.currentUser.email,
          "appoitments",
          docName
        )
      );
      if (docSnap.exists()) {
        itemdata.appoitmentdata = docSnap.data();
        newdata = [...newdata, itemdata];
        setLoaded(loaded + 1);
        console.log("----------rahat complet");
        console.log(itemdata);
      }
    }

    newdata.sort((a, b) => {
      if (a.timeadded < b.timeadded) return 1;
      if (a.timeadded > b.timeadded) return -1;
      return 0;
    });
    sethistory(newdata);

    setLoaded(1);
    console.log("grapf dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
    console.log(graphData);
  };

  return (
    <Screen>
      <AppText style={{ textAlign: "center", marginTop: 20 }}>
        Total expenses: ${sum}
      </AppText>

      {loaded && graphData.labels.length ? (
        <>
          <AppText style={{ textAlign: "center", marginTop: 20 }}>
            Last 5 service visits
          </AppText>
          <LineChart
            data={graphData}
            width={screenWidth}
            height={220}
            chartConfig={chartConfig}
            fromZero={true}
            formatXLabel={(x) => {
              return x.replace("-", "/");
            }}
            yAxisLabel="lei"
            bezier
          />
        </>
      ) : null}
      <AppText style={{ margin: 10, textAlign: "center" }}>
        Every visit cost on average ${mean}
      </AppText>
      <AppText style={{ textAlign: "center", padding: 20, fontWeight: "bold" }}>
        Service history ({nr} visits)
      </AppText>
      <FlatList
        data={history}
        keyExtractor={(item) => item.timeadded}
        renderItem={({ item }) => (
          <RequestListItem
            category={item.category}
            image={item.images[0]}
            title={"$" + item.appoitmentdata.price}
            onPress={() => {
              navigation.navigate("HistoryDetails", item);
            }}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
});

export default CarStatisticsScreen;
