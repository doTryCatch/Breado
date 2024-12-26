import React, { useState } from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";

// Sample Data
const sellers = [
  {
    id: 1,
    name: "धुपलाल",
    totalAmount: 11784,
    orders: [
      { product: "एस्पेसल", quantity: 27, price: 32 },
      { product: "बम", quantity: 140, price: 18 },
      { product: "नस्स", quantity: 23, price: 20 },
    ],
  },
  {
    id: 2,
    name: "राजेन्द्र",
    totalAmount: 7756,
    orders: [
      { product: "एस्पेसल", quantity: 0, price: 32 },
      { product: "बम", quantity: 207, price: 18 },
      { product: "नस्स", quantity: 100, price: 20 },
    ],
  },
];

export default function RecordComponent() {
  const [expandedSeller, setExpandedSeller] = useState(null);

  const toggleDetails = (sellerId) => {
    setExpandedSeller(expandedSeller === sellerId ? null : sellerId);
  };

  return (
    <View className="flex-1 bg-gray-100 p-4">
      <Text className="text-2xl font-bold text-center text-gray-800 mb-4">
        Order Records
      </Text>

      <FlatList
        data={sellers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
            {/* Seller Info */}
            <View className="flex-row justify-between items-center">
              <Text className="text-lg font-semibold text-gray-700">
                {item.name}
              </Text>
              <Text className="text-gray-500">
                Total: रु {item.totalAmount}
              </Text>
              <TouchableOpacity
                onPress={() => toggleDetails(item.id)}
                className="bg-blue-500 px-3 py-1 rounded"
              >
                <Text className="text-white font-medium">
                  {expandedSeller === item.id ? "Hide" : "Details"}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Expanded Details */}
            {expandedSeller === item.id && (
              <View className="mt-4 border-t border-gray-200 pt-2">
                <Text className="text-blue-500 font-bold mb-2">
                  Product Details:
                </Text>
                {item.orders.map((order, index) => (
                  <View
                    key={index}
                    className="flex-row justify-between mb-1 items-center"
                  >
                    <Text className="text-gray-700">
                      {order.product}: {order.quantity} pcs
                    </Text>
                    <Text className="text-gray-500">
                      Price: रु {order.price}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}
