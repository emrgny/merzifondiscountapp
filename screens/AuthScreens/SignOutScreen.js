import React, { useEffect } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const SignOutScreen = ({ route }) => {
  const { setIsAuthenticated } = route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    const signOut = async () => {
      await AsyncStorage.removeItem("token");
      setIsAuthenticated(false);
    };
    signOut();
  }, []);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#FF7518" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default SignOutScreen;
