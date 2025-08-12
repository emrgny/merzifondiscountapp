import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import BottomTabsNavigator from "./BottomTabsNavigator";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import SignOutScreen from "../../screens/AuthScreens/SignOutScreen";
import NavbarNavigator from "../../components/HomeNavbar/NavbarNavigator.js";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const userInfo = useSelector((state) => state.UserInfo);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.drawerContentContainer}
    >
      <View style={styles.userInfoSection}>
        {userInfo.imagePath ? (
          <Image
            source={{
              uri: "https://bcf92f86db9e.ngrok-free.app" + userInfo.imagePath,
            }}
            style={styles.avatar}
          />
        ) : (
          <Image
            source={require("../../assets/Logo.jpg")} // Default avatar
            style={styles.avatar}
          />
        )}
        <Text style={styles.name}>
          {userInfo.name} {userInfo.surname}
        </Text>
        <Text style={styles.email}>{userInfo.email}</Text>
      </View>

      <DrawerItemList {...props} />

      {/* Alt boşluk için esnek view */}
      <View style={{ flex: 1 }} />
    </DrawerContentScrollView>
  );
};

const DrawerNavigator = ({ setIsAuthenticated }) => {
  const dispatch = useDispatch();

  const removetoken = async () => {
    await AsyncStorage.removeItem("token");
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        header: ({ navigation }) => <NavbarNavigator navigation={navigation} />,
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabsNavigator}
        options={{
          title: "Ana Sayfa",
        }}
      />
      <Drawer.Screen
        name="Signout"
        component={SignOutScreen}
        initialParams={{ setIsAuthenticated }}
        options={{
          drawerLabel: "Çıkış Yap",
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContentContainer: {
    flexGrow: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingBottom: 40,
  },
  userInfoSection: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    alignItems: "center",
    backgroundColor: "rgb(255, 149, 47)",
    marginHorizontal: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 15,
    backgroundColor: "#ccc",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default DrawerNavigator;
