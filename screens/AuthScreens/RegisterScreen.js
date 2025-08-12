import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import DateTimePicker from "@react-native-community/datetimepicker";
import RegisterRequest from "../../api/Services/AuthRequests/RegisterRequest";
import kvkkText from "../../assets/Kvkk";
import acikRiza from "../../assets/acik_riza";
import RegisterValidations from "../../yup/RegisterValidations.js"; // yup şeması
import GenderDropdown from "../../components/DropDowns/ProfileScreen/GenderDropdown.js";

const RegisterScreen = () => {
  const navigation = useNavigation();

  // Modal görünürlük state'leri
  const [kvkkModalVisible, setKvkkModalVisible] = useState(false);
  const [rizaModalVisible, setRizaModalVisible] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  // Formik submit fonksiyonu
  const handleRegister = async (values, { setSubmitting, setErrors }) => {
    try {
      const userData = {
        name: values.name,
        surname: values.surname,
        email: values.email,
        phoneNumber: values.phoneNumber,
        password: values.password,
        gender: values.gender,
        birthDate: values.birthDate
          ? new Date(values.birthDate).toISOString().replace("Z", "")
          : null,
        kvkkAccepted: values.kvkkAccepted,
        rizaAccepted: values.rizaAccepted,
      };

      await RegisterRequest(userData);
      setSubmitting(false);
      // Kayıt başarılı, successMessage'i aktif et
      setSuccessMessage(true);

      // Buton yazısı değişsin, sonra yönlendirme yap
      setTimeout(() => {
        setSubmitting(false);
        navigation.navigate("Login");
      }, 1500);
    } catch (error) {
      setSubmitting(false); // Backend’den gelen hata mesajını al
      let message = "Kayıt sırasında hata oluştu.";

      if (error?.response?.data) {
        // Eğer data bir obje ise, message property'si var mı kontrol et
        if (
          typeof error.response.data === "object" &&
          error.response.data.message
        ) {
          message = error.response.data.message;
        } else if (typeof error.response.data === "string") {
          message = error.response.data;
        }
      } else if (error?.message) {
        message = error.message;
      }

      setSuccessMessage(false);
      setErrors({ general: message });
      console.log(error);
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/saat_kulesi2.jpg")}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              <Image
                source={require("../../assets/Logo.jpg")}
                style={{ width: 200, height: 200, marginVertical: 30 }}
              />
            </View>

            <Formik
              initialValues={{
                name: "",
                surname: "",
                email: "",
                phoneNumber: "",
                password: "",
                passwordRepeat: "",
                gender: "",
                birthDate: "",
                kvkkAccepted: false,
                rizaAccepted: false,
              }}
              validationSchema={RegisterValidations}
              onSubmit={handleRegister}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
                isSubmitting,
                setFieldValue,
              }) => (
                <View style={styles.formContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="İsim"
                    placeholderTextColor={"gray"}
                    onChangeText={handleChange("name")}
                    onBlur={handleBlur("name")}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <Text style={styles.error}>{errors.name}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Soyisim"
                    placeholderTextColor={"gray"}
                    onChangeText={handleChange("surname")}
                    onBlur={handleBlur("surname")}
                    value={values.surname}
                  />
                  {touched.surname && errors.surname && (
                    <Text style={styles.error}>{errors.surname}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor={"gray"}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    value={values.email}
                  />
                  {touched.email && errors.email && (
                    <Text style={styles.error}>{errors.email}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Telefon Numarası"
                    placeholderTextColor={"gray"}
                    keyboardType="phone-pad"
                    onChangeText={handleChange("phoneNumber")}
                    onBlur={handleBlur("phoneNumber")}
                    value={values.phoneNumber}
                  />
                  {touched.phoneNumber && errors.phoneNumber && (
                    <Text style={styles.error}>{errors.phoneNumber}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Şifre"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                  />
                  {touched.password && errors.password && (
                    <Text style={styles.error}>{errors.password}</Text>
                  )}

                  <TextInput
                    style={styles.input}
                    placeholder="Şifre Tekrar"
                    placeholderTextColor={"gray"}
                    secureTextEntry
                    onChangeText={handleChange("passwordRepeat")}
                    onBlur={handleBlur("passwordRepeat")}
                    value={values.passwordRepeat}
                  />
                  {touched.passwordRepeat && errors.passwordRepeat && (
                    <Text style={styles.error}>{errors.passwordRepeat}</Text>
                  )}
                  <TouchableOpacity
                    onPress={() => setShowDatePicker(true)}
                    style={[styles.input, { justifyContent: "center" }]}
                  >
                    <Text
                      style={{ color: values.birthDate ? "black" : "gray" }}
                    >
                      {values.birthDate
                        ? new Date(values.birthDate).toISOString().split("T")[0]
                        : "Doğum Tarihi Seçiniz"}
                    </Text>
                  </TouchableOpacity>
                  {showDatePicker && (
                    <DateTimePicker
                      value={
                        values.birthDate
                          ? new Date(values.birthDate)
                          : new Date()
                      }
                      mode="date"
                      display="default"
                      maximumDate={new Date()}
                      onChange={(event, selectedDate) => {
                        setShowDatePicker(Platform.OS === "ios"); // ios'da kalabilir picker
                        if (selectedDate) {
                          setFieldValue(
                            "birthDate",
                            selectedDate.toISOString()
                          );
                        }
                      }}
                    />
                  )}
                  <View style={{ marginVertical: 8 }}>
                    <GenderDropdown
                      selectedValue={values.gender}
                      onValueChange={(val) => setFieldValue("gender", val)}
                    />

                    {touched.gender && errors.gender && (
                      <Text style={styles.error}>{errors.gender}</Text>
                    )}
                  </View>

                  {/* KVKK Onay */}
                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue("kvkkAccepted", !values.kvkkAccepted)
                      }
                      style={styles.checkboxBox}
                    >
                      {values.kvkkAccepted && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setKvkkModalVisible(true)}>
                      <Text style={styles.linkText}>KVKK Aydınlatma Metni</Text>
                    </TouchableOpacity>

                    <Text style={styles.checkboxLabel}>
                      Okudum ve onaylıyorum
                    </Text>
                  </View>

                  <View style={styles.checkboxContainer}>
                    <TouchableOpacity
                      onPress={() =>
                        setFieldValue("rizaAccepted", !values.rizaAccepted)
                      }
                      style={styles.checkboxBox}
                    >
                      {values.rizaAccepted && (
                        <Text style={styles.checkmark}>✓</Text>
                      )}
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setRizaModalVisible(true)}>
                      <Text style={styles.linkText}>Açık Rıza Metni</Text>
                    </TouchableOpacity>

                    <Text style={styles.checkboxLabel}>
                      Okudum ve onaylıyorum
                    </Text>
                  </View>
                  {touched.rizaAccepted && errors.rizaAccepted && (
                    <Text style={styles.error}>{errors.rizaAccepted}</Text>
                  )}

                  {/* Genel hata mesajı */}
                  {errors.general && (
                    <Text style={[styles.error, { textAlign: "center" }]}>
                      {errors.general}
                    </Text>
                  )}

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={[
                      styles.fullButton,
                      (!values.kvkkAccepted ||
                        !values.rizaAccepted ||
                        isSubmitting) &&
                        styles.buttonDisabled,
                      successMessage && { backgroundColor: "green" },
                    ]}
                    disabled={
                      !values.kvkkAccepted ||
                      !values.rizaAccepted ||
                      isSubmitting
                    }
                  >
                    <Text style={styles.buttonsText}>
                      {successMessage
                        ? "Kayıt Başarılı Oturum İçin Yönlendiriliyor"
                        : isSubmitting
                        ? "Lütfen Bekleyin..."
                        : "Kayıt Ol"}
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate("Login")}
                    style={styles.loginRedirect}
                  >
                    <Text style={styles.loginRedirectText}>
                      Zaten hesabın var mı?{" "}
                      <Text style={{ fontWeight: "bold", color: "#FF7518" }}>
                        Giriş Yap
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>

        {/* KVKK Modal */}
        <Modal
          visible={kvkkModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setKvkkModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView style={{ marginBottom: 20 }}>
                <Text style={styles.modalTitle}>KVKK Aydınlatma Metni</Text>
                <Text style={styles.modalText}>{kvkkText}</Text>
              </ScrollView>
              <TouchableOpacity
                onPress={() => setKvkkModalVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* Açık Rıza Modal */}
        <Modal
          visible={rizaModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setRizaModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <ScrollView style={{ marginBottom: 20 }}>
                <Text style={styles.modalTitle}>Açık Rıza Metni</Text>
                <Text style={styles.modalText}>{acikRiza}</Text>
              </ScrollView>
              <TouchableOpacity
                onPress={() => setRizaModalVisible(false)}
                style={styles.modalButton}
              >
                <Text style={styles.modalButtonText}>Kapat</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, padding: 10 },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 50,
  },
  container: { width: "90%", justifyContent: "center" },
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
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 10,
    paddingBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    backgroundColor: "#FF7518",
    padding: 10,
    borderRadius: 10,
  },

  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: "#555",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 3,
    marginRight: 8,
  },
  checkboxBoxChecked: {
    backgroundColor: "#FF7518",
    borderColor: "#FF7518",
  },
  checkmark: {
    color: "black",
    fontWeight: "bold",
    fontSize: 16,
  },
  checkboxLabel: {
    color: "black",
  },
  linkText: {
    color: "#007bff",
    textDecorationLine: "underline",
    marginRight: 8,
  },

  fullButton: {
    backgroundColor: "#FF7518",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    paddingVertical: 12,
    width: "100%",
    marginVertical: 10,
  },
  buttonDisabled: {
    backgroundColor: "#FFA966",
  },
  buttonsText: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  loginRedirect: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 60,
    marginTop: 20,
    padding: 10,
    backgroundColor: "purple",
    borderRadius: 10,
    width: "70%",
    height: 50,
  },
  loginRedirectText: {
    fontSize: 14,
    color: "white",
  },
  error: {
    color: "white",
    marginVertical: 5,
    textAlign: "center",
    fontStyle: "italic",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
    padding: 3,
    width: "100%",
    backgroundColor: "red",
    borderRadius: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContainer: {
    backgroundColor: "rgba(255, 117, 24, 0.95)",
    borderRadius: 10,
    width: "90%",
    maxHeight: "80%",
    padding: 20,
  },
  modalTitle: {
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
    color: "white",
  },
  modalText: {
    fontSize: 14,
    color: "white",
  },
  modalButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  modalButtonText: {
    color: "#FF7518",
    fontWeight: "bold",
  },
});

export default RegisterScreen;
