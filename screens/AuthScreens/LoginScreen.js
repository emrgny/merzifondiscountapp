import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoginRequest from "../../api/Services/AuthRequests/LoginRequest";
import EnteranceApp from "../../store-data/Services/EntranceAppService/EntranceApp";
import { setLoginState } from "../../store-data/Services/LoginService/LoginSlicer";

const LoginScreen = ({ navigation, setIsAuthenticated }) => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const dispatch = useDispatch();
  const loginState = useSelector((state) => state.LoginStateSlicer);

  const handleRegister = () => {
    navigation.navigate("Register");
  };

  const handleLogin = async () => {
    if (Email && Password) {
      try {
        const result = await LoginRequest(Email, Password);

        if (result.access_token) {
          console.log("Login başarılı", result);
          await AsyncStorage.setItem("token", result.access_token);
          console.log("Token kaydedildi", await AsyncStorage.getItem("token"));
          await EnteranceApp(dispatch);
          setIsAuthenticated(true);
          dispatch(setLoginState({ error: null })); // Hata varsa temizle
        } else {
          dispatch(setLoginState({ error: "Giriş başarısız oldu." }));
        }
      } catch (error) {
        const errorMsg =
          error?.response?.data?.error_description || "Bir hata oluştu.";
        dispatch(setLoginState({ error: errorMsg }));
      }
    } else {
      dispatch(setLoginState({ error: "Email ve şifre boş olamaz!" }));
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/saat_kulesi2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../assets/Logo.jpg")}
            style={{ width: 200, height: 200, marginVertical: 30 }}
          />
        </View>
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={"gray"}
            value={Email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            placeholderTextColor={"gray"}
            secureTextEntry
            value={Password}
            onChangeText={setPassword}
          />
          {loginState.error && (
            <Text style={styles.error}>{loginState.error}</Text>
          )}

          <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                title="Üye Ol"
                onPress={handleRegister}
                style={styles.buttons}
              >
                <Text style={styles.buttonsText}>Üye Ol</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                title="GİRİŞ Yap"
                onPress={handleLogin}
                style={styles.buttons}
              >
                <Text style={styles.buttonsText}>Giriş Yap</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // Resmin tam ekranı kaplaması için 'cover' kullanıyoruz
    justifyContent: "center", // İçeriği dikey ortalar
    alignItems: "center", // İçeriği yatay ortalar
  },
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    color: "black",
    backgroundColor: "white",
    borderRadius: 10,
  },
  error: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
    backgroundColor: "white",
    width: 250,
    marginLeft: 50,
    fontStyle: "italic",
    borderRadius: 18,
    padding: 5,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingBottom: 40,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    width: 150,
    height: 80,
    marginHorizontal: 15,
    marginVertical: 40,
  },
  buttons: {
    backgroundColor: "#FF7518",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  buttonsText: {
    textAlign: "center",
    padding: 10,
    fontSize: 20,
  },
});

export default LoginScreen;
