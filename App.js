import { StyleSheet, Text, View } from "react-native";
import MainNavigator from "./navigations/MainNavigator/MainNavigator";
import { Provider } from "react-redux";
import Store from "./store-data/redux-reducer/Store";

export default function App() {
  return (
    <Provider store={Store}>
      <MainNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
