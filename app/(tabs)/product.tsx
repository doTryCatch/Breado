import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

export default function SellerOrderForm() {
  const [selectedSeller, setSelectedSeller] = useState(""); // For seller selection
  const [orders, setOrders] = useState({}); // To store product quantities

  const sellers = ["धुपाल", "राजेबरी", "सुरत", "जोगिन्दर", "काशी", "सिकट"];
  const products = [
    "एस्पेसल",
    "बम",
    "केक",
    "जुनोट",
    "क्रिम जुनोट",
    "नस्स",
    "पुसी (5)",
    "सलाइस",
    "बिस्कुट",
    "पप",
    "कप केक",
    "कट पिस",
    "पुसी (10)",
    "रस्सरी",
    "ठुलो डनट",
    "बटररी",
    "बर्गर",
  ];

  // Handle input change for product quantity
  const handleQuantityChange = (product, value) => {
    setOrders((prev) => ({
      ...prev,
      [product]: value,
    }));
  };

  const handleSubmit = () => {
    console.log("Order Submitted: ", { seller: selectedSeller, orders });
    alert(`Order placed for ${selectedSeller}!`);
  };

  return (
    <ScrollView className="flex-1 p-4 bg-gray-100">
      {/* Seller Picker */}
      <Text className="text-xl font-bold text-center mb-4">Place an Order</Text>
      <View className="mb-6 bg-white rounded-lg shadow-md">
        <Text className="text-gray-700 font-semibold px-4 py-2">
          Select Seller:
        </Text>
        <Picker
          selectedValue={selectedSeller}
          onValueChange={(itemValue) => setSelectedSeller(itemValue)}
          style={{ height: 50, width: "100%" }}
        >
          <Picker.Item label="Select a seller" value="" />
          {sellers.map((seller) => (
            <Picker.Item key={seller} label={seller} value={seller} />
          ))}
        </Picker>
      </View>

      {/* Product Input */}
      <View className="bg-white rounded-lg shadow-md p-4">
        <Text className="text-gray-700 font-bold text-center mb-2">
          Enter Quantity:
        </Text>
        {products.map((product) => (
          <View
            key={product}
            className="flex-row justify-between items-center mb-4"
          >
            <Text className="w-1/2 text-gray-600">{product}</Text>
            <TextInput
              placeholder="0"
              keyboardType="numeric"
              onChangeText={(value) => handleQuantityChange(product, value)}
              className="border border-gray-300 rounded-lg px-3 py-1 w-20 text-center"
            />
          </View>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        className="bg-orange-500 py-3 rounded-full mt-6 shadow-lg"
        onPress={handleSubmit}
        disabled={!selectedSeller}
      >
        <Text className="text-center text-white font-bold text-lg">
          Submit Order
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
