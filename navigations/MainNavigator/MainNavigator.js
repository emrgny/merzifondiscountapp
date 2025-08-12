import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthNavigator from "../AuthNavigator/AuthNavigator";
import DrawerNavigator from "../AppNavigator/DrawerNavigator";
import React, { useState, useEffect } from "react";
import { StyleSheet, Image, ImageBackground } from "react-native";
import LoginScreen from "../../screens/AuthScreens/LoginScreen";
import RegisterScreen from "../../screens/AuthScreens/RegisterScreen";
import EnteranceApp from "../../store-data/Services/EntranceAppService/EntranceApp";
import { useDispatch } from "react-redux";
import AdvertisementDetail from "../../screens/StackScreens/HomePartStack/AdvertisementDetail";
import ChangePasswordScreen from "../../screens/StackScreens/ProfilePartStack/ChangePasswordScreen";
import CompanyAdvertisementsScreen from "../../screens/StackScreens/DealersPartStack/CompanyAdvertisementsScreen";

const Stack = createStackNavigator();

export default function MainNavigator() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    const check = async () => {
      const result = await EnteranceApp(dispatch);
      if (result.success) {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };
    check();
  }, []);

  if (isLoading) {
    return (
      <ImageBackground
        source={require("../../assets/saat_kulesi2.jpg")}
        style={styles.container}
      >
        <Image source={require("../../assets/Logo.jpg")} style={styles.image} />
      </ImageBackground>
    ); // Yükleniyor durumu
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Drawer">
              {(props) => (
                <DrawerNavigator
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
            <Stack.Screen
              headerShown={false}
              name="AdvertisementDetail"
              component={AdvertisementDetail}
            />
            <Stack.Screen
              name="ChangePasswordScreen"
              component={ChangePasswordScreen}
            />
            <Stack.Screen
              name="CompanyAdvertisementsScreen"
              component={CompanyAdvertisementsScreen}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <LoginScreen
                  {...props}
                  setIsAuthenticated={setIsAuthenticated}
                />
              )}
            </Stack.Screen>
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
  },
  image: { width: 250, height: 250 },
});
