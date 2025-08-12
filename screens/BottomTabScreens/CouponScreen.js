import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GetCoupons from "../../store-data/Services/CouponService/GetAllCouponService/GetCouponsAction";

const CouponScreen = () => {
  const dispatch = useDispatch();

  const [selectedTab, setSelectedTab] = useState("active");
  const [userId, setUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchUserIdFromToken = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          setUserId(decoded.sub);
        }
      } catch (error) {
        console.error("Token alınırken hata:", error);
      }
    };

    fetchUserIdFromToken();
  }, []);

  useEffect(() => {
    if (userId) {
      dispatch(GetCoupons(userId));
    }
  }, [dispatch, userId]);

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userId = decoded.sub;
        await dispatch(GetCoupons(userId));
      }
    } catch (error) {
      console.error("Yenileme sırasında hata:", error);
    } finally {
      setRefreshing(false);
    }
  };

  const allCoupons = useSelector((state) => state.AllCoupons);

  const activeCoupons = allCoupons?.filter((item) => item.isActive);
  const usedCoupons = allCoupons?.filter((item) => !item.isActive);

  const displayedCoupons =
    selectedTab === "active" ? activeCoupons : usedCoupons;

  const renderHeader = () => (
    <View style={styles.headerRow}>
      <Text style={[styles.headerText, { flex: 1 }]}>Kupon Kodu</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Mağaza</Text>
      <Text style={[styles.headerText, { flex: 1 }]}>Alış Tarihi</Text>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={[styles.cell, { flex: 1 }]}>{item.couponCode ?? "-"}</Text>
      <Text style={[styles.cell, { flex: 1 }]}>
        {item.comapany?.companyName ?? "-"}
      </Text>
      <Text style={[styles.cell, { flex: 1 }]}>
        {item.takingCouponTime?.slice(0, 10) ?? "-"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Sekmeler */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === "active" && styles.activeTab]}
          onPress={() => setSelectedTab("active")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "active" && styles.activeTabText,
            ]}
          >
            Aktif Kuponlarım
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === "used" && styles.activeTab]}
          onPress={() => setSelectedTab("used")}
        >
          <Text
            style={[
              styles.tabText,
              selectedTab === "used" && styles.activeTabText,
            ]}
          >
            Kullanılan Kuponlarım
          </Text>
        </TouchableOpacity>
      </View>

      {/* Başlık Satırı */}
      {renderHeader()}

      {/* Liste */}
      <FlatList
        data={displayedCoupons}
        keyExtractor={(item, index) => index.toString()}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Kupon bulunamadı</Text>
        }
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

export default CouponScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: "#eee",
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: "#0080ff",
  },
  tabText: {
    color: "#333",
    fontWeight: "bold",
  },
  activeTabText: {
    color: "#fff",
  },
  headerRow: {
    flexDirection: "row",
    borderBottomWidth: 2,
    borderBottomColor: "#000",
    paddingBottom: 6,
    marginBottom: 8,
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 15,
    textAlign: "left",
  },
  row: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  cell: {
    fontSize: 14,
    color: "#333",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontStyle: "italic",
    color: "#888",
  },
});
