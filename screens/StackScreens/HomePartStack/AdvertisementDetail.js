import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import NavbarStack from "../../../components/StackNavbar/NavbarStack";
import GetAdvertisementByID from "../../../store-data/Services/AdvertisementService/GetAdvetisementByIDServices/GetAdvetisementByIDAction";
import { ADVERTISEMENT_BASE_URL } from "../../../api/Config/AdvertisementConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TakeCouponRequest from "../../../api/Services/CouponRequests/TakeCouponRequest";
const { width } = Dimensions.get("window");
const imageHeight = width * (16 / 9);

const AdvertisementDetail = ({ route }) => {
  const dispatch = useDispatch();
  const { advertisementId } = route.params;
  const advertisement = useSelector((state) => state.GetAdvertisementByID);

  useEffect(() => {
    dispatch(GetAdvertisementByID(advertisementId));
  }, [advertisementId]);

  if (!advertisement || !advertisement.contents) return null;

  const sortedContents = [...advertisement.contents].sort(
    (a, b) => a.order - b.order
  );
  const imageContents = sortedContents.filter((c) => c.contentType === "Photo");
  const textContents = sortedContents.filter((c) =>
    ["Title", "SubTitle", "Text"].includes(c.contentType)
  );

  const TakeACoupon = async (advertisementId) => {
    const userId = await AsyncStorage.getItem("userId");
    const couponData = {
      AdvertisementsId: advertisementId,
      ClientUserId: userId,
    };

    try {
      const response = await TakeCouponRequest(couponData); // dispatch yok
      alert(response);
    } catch (error) {
      console.error("Kupon alma hatası:", error);
      alert("Kupon alınamadı.");
    }
  };

  const renderTextContent = (content, index) => {
    switch (content.contentType) {
      case "Title":
        return (
          <Text key={index} style={styles.title}>
            {content.titleText}
          </Text>
        );
      case "SubTitle":
        return (
          <Text key={index} style={styles.subTitle}>
            {content.subTitleText}
          </Text>
        );
      case "Text":
        return (
          <Text key={index} style={styles.description}>
            {content.text}
          </Text>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {console.log("Advertisement Detail:", advertisement)}
      <NavbarStack />
      <ScrollView style={styles.content}>
        {/* Resimler yatay kaydırmalı */}
        <FlatList
          data={imageContents}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          renderItem={({ item }) => (
            <Image
              source={{ uri: ADVERTISEMENT_BASE_URL + item.url }}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        />

        {/* Metin içerikler */}
        <View style={styles.textContentContainer}>
          {textContents.map((content, index) =>
            renderTextContent(content, index)
          )}
        </View>
      </ScrollView>

      {/* Alt sabit butonlar */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            styles.couponButton,
            !advertisement.isHasCoupon && { backgroundColor: "#ccc" },
          ]}
          onPress={() => TakeACoupon(advertisementId)}
          disabled={!advertisement.isHasCoupon}
        >
          <Text style={styles.buttonText}>
            {advertisement.isHasCoupon ? "Kupon Al" : "Kuponlar Tükendi"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  image: {
    width: width,
    height: imageHeight,
    borderRadius: 0,
  },
  textContentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#333",
  },
  subTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginVertical: 6,
    color: "#666",
  },
  description: {
    fontSize: 16,
    color: "#444",
    marginVertical: 6,
    lineHeight: 22,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  button: {
    flex: 1,
    marginHorizontal: 10,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  favoriteButton: {
    backgroundColor: "#FF6B6B",
  },
  couponButton: {
    backgroundColor: "#4ECDC4",
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default AdvertisementDetail;
