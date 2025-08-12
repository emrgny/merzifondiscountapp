import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
} from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import NavbarStack from "../../../components/StackNavbar/NavbarStack";
import { useDispatch } from "react-redux";
import ChangePasswordRequest from "../../../api/Services/AuthRequests/ChangePasswordRequest";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ChangePasswordScreen = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    Id: null,
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChangePassword = async () => {
    if (userData.newPassword !== userData.confirmNewPassword) {
      alert("Yeni şifreler eşleşmiyor!");
      return;
    } else {
      await dispatch(ChangePasswordRequest(userData));
      alert("Şifre başarıyla değiştirildi!");
    }
  };

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setUserData((prev) => ({
            ...prev,
            Id: decoded.sub,
          }));
        }
      } catch (error) {
        console.error("Token alma hatası:", error);
      }
    };
    fetchToken();
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoiding}
        >
          <NavbarStack />
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <Text style={styles.title}>Şifre Değiştir</Text>
            <Text style={styles.label}>Mevcut Şifre</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Mevcut şifrenizi girin"
              value={userData.currentPassword}
              onChangeText={(text) =>
                setUserData({ ...userData, currentPassword: text })
              }
            />
            <Text style={styles.label}>Yeni Şifre</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Yeni şifrenizi girin"
              value={userData.newPassword}
              onChangeText={(text) =>
                setUserData({ ...userData, newPassword: text })
              }
            />
            <Text style={styles.label}>Yeni Şifre Tekrar</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              placeholder="Yeni şifreyi tekrar girin"
              value={userData.confirmNewPassword}
              onChangeText={(text) =>
                setUserData({ ...userData, confirmNewPassword: text })
              }
            />
            <View style={{ height: 100 }} />
          </ScrollView>

          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleChangePassword}
            >
              <Text style={styles.buttonText}>Şifreyi Güncelle</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginTop: 20,
    marginBottom: 5,
  },
  input: {
    height: 48,
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
  },
  button: {
    backgroundColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});

export default ChangePasswordScreen;
