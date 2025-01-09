import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Modal,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { API } from "@/config";
import { useCache } from "@/middleware/cache";
import { fetchData } from "@/utils";
import { Ionicons } from "@expo/vector-icons"; // Assuming you are using Expo for the icons

export default function Sellers() {
  const [errorMsg, setErrorMsg] = useState<string>(""); // Set type for errorMsg
  const { getCacheData, setCacheData } = useCache();
  const [loadingSellerData, setLoadingSellerData] = useState<boolean>(true); // Set type for loadingSellerData
  const [sellers, setSellers] = useState<
    { id: number; name: string; phone: string; password: string }[]
  >([]); // Set type for sellers
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false); // Set type for form visibility
  const [newSeller, setNewSeller] = useState<{
    name: string;
    phone: string;
    password: string;
  }>({
    name: "",
    phone: "",
    password: "",
  });

  const resetForm = () => {
    setNewSeller({ name: "", phone: "", password: "" });
    setErrorMsg(""); // Reset error message
    setIsFormVisible(false);
  };

  useEffect(() => {
    const fetchSellers = async () => {
      try {
        const cachedSellers = await getCacheData("sellers");
        if (cachedSellers) {
          setSellers(cachedSellers);
        } else {
          console.log("fetching data sellers");
          const fetchedSellers = await fetchData(API.getSellers);
          console.log(fetchedSellers);

          setCacheData("sellers", fetchedSellers);
          setSellers(fetchedSellers);
        }
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoadingSellerData(false);
      }
    };
    fetchSellers();
  }, [getCacheData, setCacheData]);

  const handleAddSeller = async () => {
    try {
      const response = await axios.post(API.SIGNUP, newSeller, {
        headers: { "Content-Type": "application/json" },
      });

      // Fetch updated sellers list after adding new seller
      const updatedSellers = await fetchData(API.getSellers);
      setSellers(updatedSellers);
      setCacheData("sellers", updatedSellers);

      // Show success message
      setErrorMsg(response.data.message);

      // Reset the form
      setNewSeller({
        name: "",
        phone: "",
        password: "",
      });
    } catch (error: any) {
      setErrorMsg(
        error.response?.data?.message ||
          "Failed to add seller. Please try again.",
      );
    }
    setSellers(sellers.filter((seller) => seller.id !== id));
  };

  return (
    <ScrollView
      className="flex-1 bg-gray-50 p-4"
      keyboardShouldPersistTaps="handled"
    >
      {/* Error Message */}
      {errorMsg && (
        <View className="p-4 bg-red-100 mb-4 rounded-lg">
          <Text className="text-red-700 text-sm">{errorMsg}</Text>
        </View>
      )}

      {/* Loading State */}
      {loadingSellerData ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#0000ff" />
          <Text className="mt-2 text-gray-700">Loading sellers...</Text>
        </View>
      ) : sellers.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-700">No data yet</Text>
        </View>
      ) : (
        // Sellers List
        <View className="mb-4">
          <View className="flex-row justify-between items-center">
            <Text className="text-xl font-bold text-gray-800 mb-2">
              Seller List
            </Text>
            {/* Header with Add Icon */}
            <TouchableOpacity onPress={() => setIsFormVisible(true)}>
              <Ionicons name="add-circle" size={32} color="#4CAF50" />
            </TouchableOpacity>
          </View>
          {sellers.map((seller) => (
            <View
              key={seller.user_id}
              className="flex-row justify-between items-center bg-white p-3 mb-2 rounded-lg shadow"
            >
              <View>
                <Text className="text-base font-bold text-gray-900">
                  {seller.name}
                </Text>
              </View>
              <TouchableOpacity onPress={() => handleDeleteSeller(seller.id)}>
                <Ionicons name="trash-outline" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {/* Modal for Adding New Seller */}
      <Modal
        visible={isFormVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={resetForm}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white p-4 rounded-lg w-80">
            <Text className="text-lg font-bold text-gray-900 mb-2">
              Add New Seller
            </Text>
            {errorMsg && (
              <View className="p-3 mb-3 bg-red-100 rounded-lg">
                <Text className="text-red-700 text-sm">{errorMsg}</Text>
              </View>
            )}
            <TextInput
              value={newSeller.name}
              onChangeText={(text) =>
                setNewSeller({ ...newSeller, name: text })
              }
              placeholder="Enter Name"
              className="border border-gray-300 rounded-lg p-3 mb-3 text-gray-700 text-sm"
            />
            <TextInput
              value={newSeller.phone}
              onChangeText={(text) =>
                setNewSeller({ ...newSeller, phone: text })
              }
              placeholder="Enter Phone Number"
              keyboardType="phone-pad"
              className="border border-gray-300 rounded-lg p-3 mb-3 text-gray-700 text-sm"
            />
            <TextInput
              value={newSeller.password}
              onChangeText={(text) =>
                setNewSeller({ ...newSeller, password: text })
              }
              placeholder="Enter Password"
              secureTextEntry
              className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700 text-sm"
            />
            <TouchableOpacity
              onPress={handleAddSeller}
              className="bg-green-500 p-3 rounded-lg items-center mb-2"
            >
              <Text className="text-white text-base font-bold">Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={resetForm} className="items-center mt-2">
              <Text className="text-blue-500 text-sm">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
