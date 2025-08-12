import React, { useEffect, useState } from "react";
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
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/tr";

import GetAdvertisementByCompanyIDAction from "../../../store-data/Services/AdvertisementService/GetAdvertisementsByCompanyIDServices/GetAdvertisementsByCompanyIDAction";
import NavbarStack from "../../../components/StackNavbar/NavbarStack";
import { SafeAreaView } from "react-native-safe-area-context";
import { ADVERTISEMENT_BASE_URL } from "../../../api/Config/AdvertisementConfig";

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.locale("tr");

const IMAGE_BASE_URL = ADVERTISEMENT_BASE_URL;

const Card = ({ item }) => {
  const navigation = useNavigation();
  const imageUrl = IMAGE_BASE_URL + item.advertisementMainImagePath;
  const relativeDate = dayjs(item.startDate).fromNow();

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

const CompanyAdvertisementsScreen = ({ route }) => {
  const { companyId } = route.params;
  const dispatch = useDispatch();
  const advertisements = useSelector(
    (state) => state.GetAdvertisementByCompanyID || []
  );
  const [refreshing, setRefreshing] = useState(false);
  const [searchText, setSearchText] = useState("");

  const fetchAdvertisements = async () => {
    try {
      setRefreshing(true);
      await dispatch(GetAdvertisementByCompanyIDAction(companyId));
    } catch (err) {
      console.error("Yenileme hatası:", err);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAdvertisements();
  }, [companyId]);

  const filteredAds = advertisements.filter((item) => {
    const searchLower = searchText.toLowerCase();
    const titleMatch = item.mainTitle?.toLowerCase().includes(searchLower);
    const companyMatch = item.company?.companyName
      ?.toLowerCase()
      .includes(searchLower);
    return titleMatch || companyMatch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <NavbarStack />
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={{ marginRight: 8 }}
        />
        <TextInput
          placeholder="Reklam başlığı veya şirket adı ara..."
          placeholderTextColor="rgb(255, 149, 47)"
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
          <Text style={{ textAlign: "center" }}>İlan bulunamadı.</Text>
        }
        refreshing={refreshing}
        onRefresh={fetchAdvertisements}
      />
    </SafeAreaView>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
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
    color: "rgb(255, 149, 47)",
    paddingVertical: 0,
  },
});

export default CompanyAdvertisementsScreen;
