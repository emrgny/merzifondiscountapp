import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { launchImageLibrary } from "react-native-image-picker";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import GetUserInfo from "../../store-data/Services/UserInfoService/UserInfoAction";
import GenderDropdown from "../../components/DropDowns/ProfileScreen/GenderDropdown";
import UpdateUserInfoRequest from "../../api/Services/UserInfoRequests/UpdateUserInfoRequest";
import { RefreshControl } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { USER_INFO_BASE_URL } from "../../api/Config/UserInfoConfig";

const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const userInfo = useSelector((state) => state.UserInfo);

  const [refreshing, setRefreshing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    identityId: "",
    createTime: null,
    imagePath: "",
    name: "",
    surname: "",
    email: "",
    gender: "",
    birthDate: "",
    phoneNumber: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [imageUri, setImageUri] = useState(null);

  useEffect(() => {
    onRefresh();
  }, []);

  useEffect(() => {
    if (userInfo) {
      setFormData({
        id: userInfo.id,
        identityId: userInfo.identityId,
        createTime: userInfo.createTime || null,
        imagePath: userInfo.imagePath || "",
        name: userInfo.name || "",
        surname: userInfo.surname || "",
        email: userInfo.email || "",
        gender: userInfo.gender || "",
        birthDate: userInfo.birthDate || "",
        phoneNumber: userInfo.phoneNumber || "",
      });
      if (userInfo.imagePath) {
        setImageUri(USER_INFO_BASE_URL + userInfo.imagePath);
      }
    }
  }, [userInfo]);

  const handleInputChange = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setFormData((prev) => ({
        ...prev,
        birthDate: selectedDate.toISOString(),
      }));
    }
  };

  const handleImagePick = () => {
    launchImageLibrary({ mediaType: "photo" }, (response) => {
      if (!response.didCancel && response.assets?.[0]) {
        const asset = response.assets[0];
        setImageUri(asset.uri);
        // Burada sadece uri alıyoruz, formData'da imageUri olarak kullanılacak
      }
    });
  };

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.sub;
        await dispatch(GetUserInfo(userId));
      }
    } catch (error) {
      console.error(error);
    }
    setRefreshing(false);
  };

  const handleUpdate = async () => {
    // Tarihi API formatına çevir (yyyy-MM-dd)
    const formattedBirthDate = formData.birthDate
      ? formData.birthDate.length > 10
        ? formData.birthDate.split("T")[0]
        : formData.birthDate
      : "";

    const dataToSend = {
      ...formData,
      birthDate: formattedBirthDate,
      imageUri: imageUri, // seçilen resim
    };

    console.log("Güncellenecek veri:", dataToSend);
    try {
      const result = await UpdateUserInfoRequest(dataToSend);
      alert(result);
    } catch (error) {
      console.error("Güncelleme hatası:", error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {imageUri && <Image source={{ uri: imageUri }} style={styles.avatar} />}
      <TouchableOpacity style={styles.imageButton} onPress={handleImagePick}>
        <Text style={styles.imageButtonText}>Profil Fotoğrafı Seç</Text>
      </TouchableOpacity>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Ad</Text>
        <TextInput
          style={styles.input}
          value={formData.name}
          onChangeText={(text) => handleInputChange("name", text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Soyad</Text>
        <TextInput
          style={styles.input}
          value={formData.surname}
          onChangeText={(text) => handleInputChange("surname", text)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Telefon</Text>
        <TextInput
          style={styles.input}
          value={formData.phoneNumber}
          onChangeText={(text) => handleInputChange("phoneNumber", text)}
          keyboardType="phone-pad"
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Cinsiyet</Text>
        <GenderDropdown
          selectedValue={formData.gender}
          onValueChange={(val) => handleInputChange("gender", val)}
        />
      </View>
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Doğum Tarihi</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setShowDatePicker(true)}
        >
          <Text>
            {formData.birthDate
              ? formData.birthDate.split("T")[0]
              : "Tarih Seç"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={
              formData.birthDate
                ? new Date(formData.birthDate)
                : new Date("2000-01-01")
            }
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
        <Text style={styles.buttonText}>Bilgilerimi Güncelle</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.updateButton,
          { backgroundColor: "#2196F3", marginTop: 12 },
        ]}
        onPress={() => navigation.navigate("ChangePasswordScreen")}
      >
        <Text style={styles.buttonText}>Şifre Değiştir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
  imageButton: {
    backgroundColor: "#FF9800",
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
  },
  imageButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  inputGroup: {
    width: "100%",
    marginBottom: 10,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  dateButton: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  updateButton: {
    backgroundColor: "#4CAF50", // yeşil, güncelleme için
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
