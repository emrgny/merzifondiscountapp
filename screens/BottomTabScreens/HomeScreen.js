import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import GetAdvertisements from "../../store-data/Services/AdvertisementService/GetAllAdvertisementServices/GetAdvertisementsAction";
import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { ADVERTISEMENT_BASE_URL } from "../../api/Config/AdvertisementConfig";

// Dayjs ayarları
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale("tr");

const IMAGE_BASE_URL = ADVERTISEMENT_BASE_URL;

const Card = ({ item }) => {
  const navigation = useNavigation();
  const imageUrl = IMAGE_BASE_URL + item.advertisementMainImagePath;
  const relativeDate = dayjs(item.publishDate).fromNow();

  return (
    <View style={styles.card}>
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.title}>{item.mainTitle}</Text>
      <View style={styles.infoRow}>
        <Text style={styles.publishDate}>{relativeDate}</Text>
        <Text style={styles.companyName}>{item.company?.companyName}</Text>
        {item.couponCount > 0 && (
          <Text style={styles.coupon}>{item.couponCount} Kupon Bulunuyor</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          navigation.navigate("AdvertisementDetail", {
            advertisementId: item.advertisementsId,
          })
        }
      >
        <Text style={styles.buttonText}>İndirime Git</Text>
      </TouchableOpacity>
    </View>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();

  const advertisements = useSelector((state) => state.AllAdvertisements);
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchAds = async () => {
    try {
      setRefreshing(true);
      await dispatch(GetAdvertisements());
    } catch (err) {
      console.error("Yenileme sırasında hata:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  // Reklamları filtreleme: başlık veya şirket adına göre
  const filteredAds = advertisements.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const titleMatch = item.mainTitle.toLowerCase().includes(searchLower);
    const companyMatch = item.company?.companyName
      .toLowerCase()
      .includes(searchLower);
    return titleMatch || companyMatch;
  });

  return (
    <>
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
            placeholder="Reklam başlığı veya şirket adı ara..."
            placeholderTextColor="rgb(255, 149, 47);"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            clearButtonMode="while-editing"
          />
        </View>

        <FlatList
          contentContainerStyle={{ padding: 16 }}
          data={filteredAds}
          keyExtractor={(item) => item.advertisementsId}
          renderItem={({ item }) => <Card item={item} />}
          ListEmptyComponent={
            <Text style={{ textAlign: "center" }}>Reklam bulunamadı.</Text>
          }
          refreshing={refreshing}
          onRefresh={fetchAds}
        />
      </View>
    </>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: "#333",
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  publishDate: {
    flex: 1,
    color: "#666",
    fontSize: 14,
  },
  companyName: {
    flex: 1,
    color: "#666",
    fontSize: 14,
    textAlign: "center",
  },
  coupon: {
    flex: 1,
    color: "#008000",
    fontWeight: "bold",
    fontSize: 14,
    textAlign: "right",
  },
  button: {
    backgroundColor: "#007bff",
    margin: 12,
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
    color: "rgb(255, 149, 47);",
    paddingVertical: 0, // TextInput dikey ortalanması için
  },
});

export default HomeScreen;
