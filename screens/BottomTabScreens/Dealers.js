import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import GetCompanies from "../../store-data/Services/CompanyServices/GetAllCompaniesServices/GetCompaniesAction";
import { useNavigation } from "@react-navigation/native";
import { COMPANY_BASE_URL } from "../../api/Config/CompanyConfig";
const IMAGE_BASE_URL = COMPANY_BASE_URL;
const truncateText = (text, maxLength = 300) => {
  if (!text) return "";
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
};

const Card = ({ item, navigation }) => {
  const imageUrl = IMAGE_BASE_URL + item.companyImagePath;
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.companyName}>{item.companyName}</Text>
      <Text style={styles.description}>
        {truncateText(item.companyDescription)}
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("CompanyAdvertisementsScreen", {
            companyId: item.companyId,
          })
        }
      >
        <Text style={styles.buttonText}>Bayinin Kampanyalarını Gör</Text>
      </TouchableOpacity>
    </View>
  );
};

const DealerScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const companies = useSelector((state) => state.AllCompanies);

  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchCompanies = useCallback(async () => {
    setRefreshing(true);
    try {
      await dispatch(GetCompanies());
    } catch (error) {
      console.error("Yenileme sırasında hata:", error);
    } finally {
      setRefreshing(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCompanies();
  }, []);

  // Arama filtresi (isim veya açıklama)
  const filteredCompanies = companies.filter((company) => {
    const search = searchText.toLowerCase();
    const nameMatch = company.companyName?.toLowerCase().includes(search);
    const descMatch = company.companyDescription
      ?.toLowerCase()
      .includes(search);
    return nameMatch || descMatch;
  });

  return (
    <View style={{ flex: 1 }}>
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Bayi adı veya açıklama ara..."
          placeholderTextColor="rgb(255, 149, 47)"
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          clearButtonMode="while-editing"
        />
      </View>

      {/* Liste */}
      <FlatList
        contentContainerStyle={{ padding: 16 }}
        data={filteredCompanies}
        keyExtractor={(item) => item.companyId}
        renderItem={({ item }) => <Card item={item} navigation={navigation} />}
        ListEmptyComponent={
          <Text style={{ textAlign: "center" }}>Bayi bulunamadı.</Text>
        }
        refreshing={refreshing}
        onRefresh={fetchCompanies}
      />
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
  },
  companyName: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 8,
    color: "#333",
  },
  description: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginHorizontal: 12,
    marginTop: 6,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#28a745",
    marginHorizontal: 12,
    marginBottom: 12,
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgb(255, 255, 255)",
    paddingHorizontal: 10,
    borderRadius: 8,
    margin: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 40,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "rgb(255, 149, 47)",
    paddingVertical: 0,
  },
});

export default DealerScreen;
