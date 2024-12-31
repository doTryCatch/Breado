import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from "react-native";
import { API } from "@/config";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getRecord } from "@/utils";
import { useAuth } from "@/middleware/auth";

export default function RecordComponent() {
  const [expandedDate, setExpandedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isOrderDataLoading, setOrderDataLoading] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [record, setRecord] = useState([]);
  const [depositAmount, setDepositAmount] = useState({}); // Track deposit input per userId
  const { user } = useAuth();

  const onChange = (event, selectedDate) => {
    setShowDate(false);
    if (selectedDate) {
      setDate(selectedDate);
    }
  };

  const toggleDetails = (dateKey) => {
    setExpandedDate(expandedDate === dateKey ? null : dateKey);
  };

  const handleDeposit = async (userId) => {
    const amount = depositAmount[userId];
    if (!amount || isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return;
    }

    try {
      // Trigger backend API for deposit
      const response = await fetch(`${API.deposit}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, amount }),
      });

      if (response.ok) {
        Alert.alert("Success", "Deposit made successfully.");
        setDepositAmount((prev) => ({ ...prev, [userId]: "" })); // Reset input
      } else {
        Alert.alert("Error", "Failed to make the deposit.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      console.log("fetching record");
      try {
        console.log("user id " + user.user_id);
        const data = await getRecord(API.getRecord);
        setRecord(data.data);

        setOrderDataLoading(false);
      } catch (error) {
        console.log(error);

        setOrderDataLoading(false);
      }
    };
    fetchData();
  }, [user]);

  return (
    <View className="flex-1 bg-gray-100 p-4">
      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDate(true)}>
        <View className="flex-row justify-between items-center bg-white p-3 my-4 border border-solid border-orange-400 rounded-3xl">
          <Text className="text-bold text-[18px]">
            {date.toLocaleString("default", { month: "long" }) +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear()}
          </Text>
          <Ionicons name="calendar" size={30} color="#000" />
        </View>
      </TouchableOpacity>
      {showDate && (
        <DateTimePicker
          value={date}
          mode={"date"}
          is24Hour={true}
          onChange={onChange}
        />
      )}

      {/* Loading screen */}
      {isOrderDataLoading ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6347" />
          <Text className="mt-4 text-gray-700">Loading data...</Text>
        </View>
      ) : record.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">No records yet</Text>
        </View>
      ) : (
        <FlatList
          data={record}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-4 rounded-lg shadow-md">
              {/* Date Info */}
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-700">
                  {item.date}
                </Text>
                <TouchableOpacity
                  onPress={() => toggleDetails(item.date)}
                  className="bg-blue-500 px-3 py-1 rounded"
                >
                  <Text className="text-white font-medium">
                    {expandedDate === item.date ? "Hide" : "Details"}
                  </Text>
                </TouchableOpacity>
              </View>

              {/* Expanded Details */}
              {expandedDate === item.date && (
                <View className="mt-4 border-t border-gray-200 pt-2">
                  {item.order.map((order, index) => (
                    <View key={index} className="mb-4">
                      <Text className="font-semibold text-gray-700 mb-2">
                        Seller: {order.username} (ID: {order.userId})
                      </Text>
                      <Text className="font-bold text-blue-500 mb-2">
                        Product Details:
                      </Text>
                      {order.productDetails.map((product, idx) => (
                        <View
                          key={idx}
                          className="flex-row justify-between mb-1 items-center"
                        >
                          <Text className="text-gray-700">
                            {product.productName}: {product.quantity} pcs
                          </Text>
                          <Text className="text-gray-500">
                            Price: रु{" "}
                            {product.totalPriceOfRespectiveProductItem}
                          </Text>
                        </View>
                      ))}

                      {/* Total and Remaining */}
                      <View className="mt-4">
                        <Text className="text-gray-800 font-medium">
                          Total: रु {order.totalOrderCost}
                        </Text>
                        <Text className="text-gray-800 font-medium">
                          Remaining: रु{" "}
                          {order.totalOrderCost - order.paidAmountForOrder}
                        </Text>
                      </View>

                      {/* Deposit Section */}
                      <View className="mt-4">
                        <TextInput
                          placeholder="Enter deposit amount"
                          keyboardType="numeric"
                          value={depositAmount[order.userId] || ""}
                          onChangeText={(text) =>
                            setDepositAmount((prev) => ({
                              ...prev,
                              [order.userId]: text,
                            }))
                          }
                          className="bg-gray-100 p-3 rounded-lg border border-gray-300"
                        />
                        <TouchableOpacity
                          onPress={() => handleDeposit(order.userId)}
                          className="mt-2 bg-green-500 px-4 py-2 rounded"
                        >
                          <Text className="text-white text-center font-medium">
                            Deposit
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      )}
    </View>
  );
}
