import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/BottomTabScreens/HomeScreen";
import { Text, StyleSheet, Image, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Dealers from "../../screens/BottomTabScreens/Dealers";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Ionicons from "@expo/vector-icons/Ionicons";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import CouponScreen from "../../screens/BottomTabScreens/CouponScreen";
import ProfileScreen from "../../screens/BottomTabScreens/ProfileScreen";
const Tab = createBottomTabNavigator();

const BottomTabsNavigator = () => {
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: "black" }}
        edges={["bottom", "top"]}
      >
        <Tab.Navigator
          screenOptions={{
            tabBarStyle: {
              backgroundColor: "rgb(255, 149, 47)", // Tüm tab bar'ın arka planı
              height: 82,
              justifyContent: "center",
            },
            marginTop: 10,
            tabBarActiveTintColor: "white", // Aktif ikon/metin rengi
            tabBarInactiveTintColor: "black", // Pasif ikon/metin rengi
            tabBarInactiveBackgroundColor: "rgb(255, 149, 47)", // Diğer sekmelerin arka planı
            tabBarLabelStyle: { fontSize: 12, marginTop: 8 },
            headerShown: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarLabel: "Anasayfa",
              tabBarIcon: () => (
                <FontAwesome
                  name="home"
                  size={24}
                  color="black"
                  style={{ marginTop: 6 }}
                />
              ),
              headerShown: false,

              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Dealers"
            component={Dealers}
            options={{
              tabBarLabel: "Anasayfa",
              tabBarIcon: () => (
                <Entypo
                  name="shop"
                  size={24}
                  color="black"
                  style={{ marginTop: 6 }}
                />
              ),
              tabBarLabel: "İşletmeler",
              headerShown: false,
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Coupons"
            component={CouponScreen}
            options={{
              tabBarLabel: "Kuponlar",
              tabBarIcon: () => (
                <Image
                  source={require("../../assets/coupon.png")}
                  style={{
                    width: 24,
                    height: 24,
                    resizeMode: "contain",
                    marginTop: 6,
                  }}
                />
              ),
              headerShown: false,
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
              tabBarLabel: "Profilim",
              tabBarIcon: () => (
                <Ionicons
                  name="person-circle-sharp"
                  size={24}
                  color="black"
                  style={{ marginTop: 6 }}
                />
              ),
              headerShown: false,
              headerStyle: styles.headerStyle,
              headerTitleAlign: "center",
            }}
          />
        </Tab.Navigator>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#FF8C00", // Daha canlı turuncu
    elevation: 8, // Android gölgesi ekle
    shadowColor: "#FF6F00", // Gölge rengi turuncu tonlarında
    shadowOffset: { width: 0, height: 6 }, // Gölge pozisyonu
    shadowOpacity: 0.7,
    shadowRadius: 10,
  },
  headerTitle: {
    color: "#fff",
    fontWeight: "900",
    fontSize: 22,
    letterSpacing: 1,
    textAlign: "center",
    flex: 1,
    textShadowColor: "rgba(0, 0, 0, 0.8)", // Yazı gölgesi
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 4,
    textTransform: "uppercase",
    fontFamily: "sans-serif-condensed", // Daha modern font (Android)
  },
  separator: {
    width: 1,
    backgroundColor: "black",
    borderRadius: 1,
  },
});

export default BottomTabsNavigator;
