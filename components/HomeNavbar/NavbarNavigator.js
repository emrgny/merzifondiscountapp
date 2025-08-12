import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import Logo from "../../assets/Logo.jpg"; // Logo resmini buradan alıyoruz

const NavbarNavigator = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        onPress={() => navigation.toggleDrawer()}
        style={styles.menuButton}
      >
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* Search */}
      <Text style={styles.text}>
        Merzifon İndirimde Bütün Kampanyalar Seni Bekliyor
      </Text>

      {/* Logo */}
      <Image source={Logo} style={styles.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS === "ios" ? 40 : 35, // iOS için ekstra boşluk
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgb(255, 149, 47)", // Daha canlı turuncu
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "rgb(255, 243, 245)", // beyaz yazı
    textShadowColor: "#00000070", // hafif siyah gölge
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginHorizontal: 4,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 1,
  },
  searchText: {
    flex: 1,
    textAlign: "center",
    color: "black",
    fontWeight: "bold",
    marginLeft: 8,
  },
  iconButton: {
    marginLeft: 15,
    padding: 8,
  },
  logo: {
    width: 45,
    height: 45,
    marginLeft: 12,
    borderRadius: 4,
    resizeMode: "contain", // Görüntünün bozulmaması için
  },
});

export default NavbarNavigator;
