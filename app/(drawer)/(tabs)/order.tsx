import React, { useEffect, useState } from "react";
import { API } from "@/config";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { fetchData } from "@/utils";
import { useCache } from "@/middleware/cache";

type Order = {
  productId: number;
  productQuantity: number;
};

export default function SellerOrderForm() {
  const orderKey1 = "sellers";
  const orderKey2 = "products";

  const [selectedSellerId, setSelectedSellerId] = useState<string | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [sellers, setSellers] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoadingSellers, setIsLoadingSellers] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { getCacheData, setCacheData } = useCache();

  useEffect(() => {
    const fetchCacheData = async () => {
      console.log("fetching data");
      try {
        const sellerCache = await getCacheData(orderKey1);
        const productCache = await getCacheData(orderKey2);

        if (sellerCache) {
          setSellers(sellerCache);
          console.log("fetched data from cache");
        } else {
          console.log("fetching data from database");
          const fetchedSellers = await fetchData(API.getSellers);
          console.log(fetchedSellers);
          setCacheData(orderKey1, fetchedSellers);
          setSellers(fetchedSellers);
        }

        if (productCache) {
          setProducts(productCache);
        } else {
          const fetchedProducts = await fetchData(API.getProducts);
          setCacheData(orderKey2, fetchedProducts);
          setProducts(fetchedProducts);
        }
        setIsLoadingProducts(false);
        setIsLoadingSellers(false);
      } catch (error) {
        console.log(error);
        setIsLoadingProducts(false);
        setIsLoadingSellers(false);
      }
    };

    fetchCacheData();
  }, [getCacheData, setCacheData]);

  const handleQuantityChange = (productId: number, value: string) => {
    const quantity = parseInt(value, 10);
    if (!isNaN(quantity) && quantity > 0) {
      setOrders((prev) => {
        const existingOrder = prev.find(
          (order) => order.productId === productId,
        );
        if (existingOrder) {
          return prev.map((order) =>
            order.productId === productId
              ? { ...order, productQuantity: quantity }
              : order,
          );
        } else {
          return [...prev, { productId, productQuantity: quantity }];
        }
      });
    } else {
      // Remove the product from the order if the value is invalid or zero
      setOrders((prev) =>
        prev.filter((order) => order.productId !== productId),
      );
    }
  };

  const handleSubmit = () => {
    if (!selectedSellerId) {
      Alert.alert("Error", "Please select a seller before submitting.");
      return;
    }

    if (orders.length === 0) {
      Alert.alert("Error", "Please add at least one product to the order.");
      return;
    }

    console.log("Order Submitted: ", {
      userId: selectedSellerId,
      products: orders,
    });

    Alert.alert("Success", `Order placed for Seller ID: ${selectedSellerId}!`);
  };
  if (isLoadingSellers || isLoadingProducts) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#FF6347" />
        <Text className="mt-4 text-gray-700">Loading data...</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {/* Seller Picker */}
      <View className="mb-6 bg-white rounded-lg shadow-md">
        <Picker
          selectedValue={selectedSellerId}
          onValueChange={(itemValue) => setSelectedSellerId(itemValue)}
          style={{ height: 50, width: "100%", color: "red" }}
        >
          <Picker.Item label="Select a seller" value={null} />
          {sellers.length > 0 ? (
            sellers.map((seller) => (
              <Picker.Item
                key={seller.id}
                label={seller.name}
                value={seller.id}
              />
            ))
          ) : (
            <View>
              <Text>No Sellers Listed yet!!</Text>
            </View>
          )}
        </Picker>
      </View>

      {/* Product Input */}
      <View className="bg-white rounded-lg shadow-md p-4">
        <Text className="text-gray-700 font-bold text-center mb-2">
          Enter Quantity:
        </Text>
        {products.map((product) => (
          <View
            key={product.id}
            className="flex-row justify-between items-center mb-4"
          >
            <Text className="w-1/2 text-gray-600">{product.name}</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              onChangeText={(value) => handleQuantityChange(product.id, value)}
              className="border border-gray-300 rounded-lg px-3 py-1 w-20 text-center"
            />
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-full mt-6 shadow-lg"
        onPress={handleSubmit}
        disabled={!selectedSellerId}
      >
        <Text className="text-center text-white font-bold text-lg">
          Submit Order
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
