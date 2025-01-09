import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { API } from "@/config";
import { fetchData, placeOrder } from "@/utils";
import { useCache } from "@/middleware/cache";
import { useAuth } from "@/middleware/auth";

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const { user } = useAuth();
  const { getCacheData, setCacheData } = useCache();

  useEffect(() => {
    const fetchCacheData = async () => {
      try {
        const sellerCache = await getCacheData(orderKey1);
        if (user.role === "manager") {
          if (sellerCache) {
            setSellers(sellerCache);
          } else {
            const fetchedSellers = await fetchData(API.getSellers);
            setCacheData(orderKey1, fetchedSellers);
            setSellers(fetchedSellers);
          }
        }
        setIsLoadingSellers(false);

        const productCache = await getCacheData(orderKey2);
        if (productCache) {
          setProducts(productCache);
        } else {
          const fetchedProducts = await fetchData(API.getProducts);
          setCacheData(orderKey2, fetchedProducts);
          setProducts(fetchedProducts);
        }
        setIsLoadingProducts(false);
      } catch (error) {
        console.error(error);
        setIsLoadingProducts(false);
        setIsLoadingSellers(false);
      }
    };

    fetchCacheData();
  }, [getCacheData, setCacheData, user]);

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
      setOrders((prev) =>
        prev.filter((order) => order.productId !== productId),
      );
    }
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await placeOrder(API.createOrder, {
        userId: user.role === "manager" ? selectedSellerId : user.id,
        products: orders,
      });
      Alert.alert(response.message);
      setIsModalVisible(false);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to place order. Please try again.");
    }
  };

  if (isLoadingSellers || isLoadingProducts) {
    return (
      <View className="flex-1 justify-center items-center bg-gray-100">
        <ActivityIndicator size="large" color="#FF6347" />
        <Text className="mt-4 text-gray-700">Loading data...</Text>
      </View>
    );
  }

  const selectedSeller = sellers.find(
    (seller) => seller.user_id === selectedSellerId,
  );

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {/* Seller Picker */}
      {user.role === "manager" && (
        <View className="mb-6 bg-white rounded-lg shadow-md">
          <Picker
            selectedValue={selectedSellerId}
            onValueChange={(itemValue) => setSelectedSellerId(itemValue)}
            style={{ height: 50, width: "100%", color: "red" }}
          >
            <Picker.Item label="Select a seller" value={null} />
            {sellers.map((seller) => (
              <Picker.Item
                key={seller.user_id}
                label={seller.name}
                value={seller.user_id}
              />
            ))}
          </Picker>
        </View>
      )}

      {/* Product Input */}
      <View className="bg-white rounded-lg shadow-md p-4">
        <Text className="text-gray-700 font-bold text-center mb-2">
          Enter Quantity:
        </Text>
        {products.map((product) => (
          <View
            key={product.product_id}
            className="flex-row justify-between items-center mb-4"
          >
            <Text className="w-1/2 text-gray-600">{product.name}</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              onChangeText={(value) =>
                handleQuantityChange(product.product_id, value)
              }
              className="border border-gray-300 rounded-lg px-3 py-1 w-20 text-center"
            />
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-full mt-6 shadow-lg"
        onPress={() => setIsModalVisible(true)}
        disabled={!selectedSellerId}
      >
        <Text className="text-center text-white font-bold text-lg">
          Submit Order
        </Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white rounded-lg p-6 w-11/12">
            <Text className="text-lg font-bold mb-4">Confirm Order</Text>
            {selectedSeller && (
              <Text className="mb-2">
                Seller: {selectedSeller.name} (ID: {selectedSeller.user_id})
              </Text>
            )}
            <Text className="font-bold mb-2">Order Details:</Text>
            {orders.map((order) => {
              console.log(order);
              const product = products.find(
                (product) => product.product_id === order.productId,
              );
              console.log(product);
              return (
                <Text key={order.productId}>
                  {product?.name}: {order.productQuantity}
                </Text>
              );
            })}

            <View className="flex-row justify-between mt-6">
              <TouchableOpacity
                className="bg-gray-300 py-2 px-4 rounded"
                onPress={() => setIsModalVisible(false)}
              >
                <Text>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-orange-500 py-2 px-4 rounded"
                onPress={handleConfirmOrder}
              >
                <Text className="text-white">Confirm Order</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
