import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Modal,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { API } from "@/config";
import axios from "axios";
export default function SelectorScreen() {
  const [selectedOption, setSelectedOption] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState<any>(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Simulate backend request for confirmation
    try {
      const response = await axios.post(
        API.addExpense,
        { name: selectedOption, amount: amount },
        {
          headers: { "Context-type": "application/json" },
          withCredentials: true,
        },
      );
      setLoading(false);
      setModalVisible(false);

      if (response.data.success) {
        alert(response.data.message); // Success feedback
      } else {
        setError(response.data.message); // Display error
      }
    } catch (err) {
      setLoading(false);
      setError(`An unexpected error occurred. ${err}`);
    }
  };

  const openConfirmationModal = () => {
    if (!selectedOption || !amount) {
      setError("Please select an option and enter an amount.");
      return;
    }
    setModalVisible(true);
  };

  return (
    <View className="flex-1 bg-white p-4">
      <Text className="text-lg font-semibold text-gray-800 mb-2">
        चिज छान्नुहोस्:
      </Text>
      <Picker
        selectedValue={selectedOption}
        onValueChange={(itemValue) => setSelectedOption(itemValue)}
        className="h-12 border border-gray-300 rounded-lg bg-white mb-4"
      >
        <Picker.Item label="Select an option" value="" />
        {[
          { value: "खाना", label: "खाना" },
          { value: "मैदा", label: "मैदा" },
          { value: "चिनी", label: "चिनी" },
          { value: "रिफाइन", label: "रिफाइन" },
          { value: "प्लास्टिक", label: "प्लास्टिक" },
          { value: "नुन", label: "नुन" },
          { value: "इस्ट", label: "इस्ट" },
          { value: "बिजुली बिल", label: "बिजुली बिल" },
          { value: "जाइमेश", label: "जाइमेश" },
          { value: "ग्यास", label: "ग्यास" },
          { value: "ज्याला", label: "ज्याला" },
        ].map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.label}
          />
        ))}
      </Picker>

      <Text className="text-lg font-semibold text-gray-800 mb-2">
        रकम प्रविष्ट गर्नुहोस्:
      </Text>
      <TextInput
        className="h-10 border border-gray-300 rounded-lg px-3 mb-4"
        keyboardType="numeric"
        placeholder="Amount"
        value={amount}
        onChangeText={(text) => setAmount(text)}
      />

      {error && <Text className="text-red-500 mb-4">{error}</Text>}

      <Button title="Submit" onPress={openConfirmationModal} color="#1D4ED8" />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="w-11/12 bg-white rounded-lg p-6">
            {loading ? (
              <ActivityIndicator size="large" color="#1D4ED8" />
            ) : (
              <>
                <Text className="text-lg font-semibold text-gray-800 mb-2">
                  Confirm your selection:
                </Text>
                <Text className="text-gray-700 mb-2">
                  <Text className="font-bold">Option: </Text>
                  {selectedOption}
                </Text>
                <Text className="text-gray-700 mb-4">
                  <Text className="font-bold">Amount: </Text>
                  {amount}
                </Text>
                <View className="flex-row justify-between">
                  <Button
                    title="Back"
                    onPress={() => setModalVisible(false)}
                    color="#D32F2F"
                  />
                  <Button
                    title="Confirm"
                    onPress={handleSubmit}
                    color="#1D4ED8"
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}
