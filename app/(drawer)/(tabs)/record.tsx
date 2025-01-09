import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
  Modal,
} from "react-native";
import { API } from "@/config";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { getRecord } from "@/utils";
import { useAuth } from "@/middleware/auth";
import { useCache } from "@/middleware/cache";

export default function RecordComponent() {
  const [expandedDate, setExpandedDate] = useState(null);
  const [date, setDate] = useState(new Date());
  const [isOrderDataLoading, setOrderDataLoading] = useState(true);
  const [showDate, setShowDate] = useState(false);
  const [record, setRecord] = useState([]);
  const [depositAmount, setDepositAmount] = useState({});
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const { getCacheData, setCacheData } = useCache();
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

  const handleDeposit = async (order) => {
    const amount = depositAmount[order.sellerId];
    if (!amount || isNaN(amount) || amount <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid amount.");
      return;
    }

    try {
      const response = await axios.post(
        API.paymentForOrder,
        { orderId: order.orderId, depositAmount: amount },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );

      Alert.alert(response.data.message);
      if (response.data.success) {
        order.paidAmountForOrder = amount;
        setDepositAmount((prev) => ({ ...prev, [order.sellerId]: 0 }));
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sellerOrderRecord = await getCacheData("sellerRecords");
        if (sellerOrderRecord) {
          setRecord(sellerOrderRecord);
        } else {
          const response = await getRecord(API.getRecord);
          setRecord(response.data);
          setCacheData("sellerRecords", response.data);
        }
        setOrderDataLoading(false);
      } catch (error) {
        console.error(error);
        setOrderDataLoading(false);
      }
    };
    fetchData();
  }, [setCacheData, getCacheData, user]);

  const filteredRecords = record.filter((item) => {
    const recordDate = new Date(item.date);
    return (
      recordDate.getDate() === date.getDate() &&
      recordDate.getMonth() === date.getMonth() &&
      recordDate.getFullYear() === date.getFullYear()
    );
  });

  return (
    <View className="flex-1 bg-gray-50 p-4">
      {/* Date Picker */}
      <TouchableOpacity onPress={() => setShowDate(true)}>
        <View className="flex-row justify-between items-center bg-white p-3 my-4 border border-gray-300 rounded-xl shadow-sm">
          <Text className="font-bold text-lg text-gray-800">
            {date.toLocaleString("default", { month: "long" }) +
              " " +
              date.getDate() +
              ", " +
              date.getFullYear()}
          </Text>
          <Ionicons name="calendar" size={24} color="#4A5568" />
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
          <Text className="mt-4 text-gray-600">Loading data...</Text>
        </View>
      ) : filteredRecords.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">
            No records for this date
          </Text>
        </View>
      ) : (
        <FlatList
          data={filteredRecords}
          keyExtractor={(item) => item.date}
          renderItem={({ item }) => (
            <View className="bg-white p-4 mb-6 rounded-lg shadow-md">
              {/* Date Info */}
              <View className="flex-row justify-between items-center">
                <Text className="text-lg font-semibold text-gray-800">
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
                <View className="mt-4 border-t border-gray-200 pt-3">
                  {item.order.map((order, index) => (
                    <View
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-200 shadow-sm"
                    >
                      <Text className="text-lg font-bold text-gray-700">
                        {order.sellerName}
                      </Text>
                      <Text className="font-semibold text-gray-500 mt-2">
                        Product Details:
                      </Text>
                      {order.products.map((product, idx) => (
                        <View
                          key={idx}
                          className="flex-row justify-between items-center mt-1"
                        >
                          <Text className="text-gray-600">
                            {product.name}: {product.quantity} pcs
                          </Text>
                          <Text className="text-gray-500">
                            रु {product.totalPrice}
                          </Text>
                        </View>
                      ))}

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
                        {order.paidAmountForOrder === 0 ? (
                          <TouchableOpacity
                            onPress={() => {
                              setSelectedOrder(order);
                              setIsModalVisible(true);
                            }}
                            className="bg-green-500 px-4 py-2 rounded"
                          >
                            <Text className="text-white text-center font-medium">
                              Pay Deposit
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <Text className="text-gray-500 mt-2">
                            Deposit already paid
                          </Text>
                        )}
                      </View>
                    </View>
                  ))}
                </View>
              )}
            </View>
          )}
        />
      )}

      {/* Modal for deposit input */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-6 rounded-lg shadow-lg w-80">
            <Text className="text-xl font-semibold mb-4">
              Enter Deposit Amount
            </Text>
            <TextInput
              placeholder="Enter deposit amount"
              keyboardType="numeric"
              value={depositAmount[selectedOrder?.sellerId] || ""}
              onChangeText={(text) =>
                setDepositAmount((prev) => ({
                  ...prev,
                  [selectedOrder.sellerId]: parseFloat(text),
                }))
              }
              className="bg-gray-100 p-3 rounded-lg border border-gray-300 mb-4"
            />
            <TouchableOpacity
              onPress={() => {
                handleDeposit(selectedOrder);
                setIsModalVisible(false);
              }}
              className="bg-green-500 px-4 py-2 rounded"
            >
              <Text className="text-white text-center font-medium">
                Confirm Payment
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsModalVisible(false)}
              className="mt-2"
            >
              <Text className="text-red-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
