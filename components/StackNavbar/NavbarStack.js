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
import Logo from "../../assets/Logo.jpg";
import { useNavigation } from "@react-navigation/native";

const NavbarStack = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.iconButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      <Text style={styles.text}>
        Merzifon İndirimde Bütün Kampanyalar Seni Bekliyor
      </Text>

      <Image source={Logo} style={styles.logo} />
    </View>
  );
};
const styles = StyleSheet.create({
  headerContainer: {
    marginTop: Platform.OS === "ios" ? 40 : 0,
    marginBottom: 10,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: "center",
    backgroundColor: "rgb(255, 149, 47)",
  },
  iconButton: {
    padding: 8,
    marginLeft: 5,
  },
  text: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "700",
    color: "rgb(255, 243, 245)",
    textShadowColor: "#00000070",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 2,
    marginHorizontal: 4,
    fontFamily: Platform.OS === "ios" ? "Georgia" : "serif",
    letterSpacing: 1,
  },
  logo: {
    width: 45,
    height: 45,
    marginLeft: 12,
    borderRadius: 4,
    resizeMode: "contain",
  },
});

export default NavbarStack;
