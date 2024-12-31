import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
const MenuItem = ({ icon, label, badgeCount }) => (
  <TouchableOpacity className="flex-row items-center justify-between bg-white p-4 mb-3 rounded-lg shadow-md">
    <View className="flex-row items-center space-x-3">
      <Ionicons name={icon} size={24} color="#FF7F50" />
      <Text className="text-base text-gray-800">{label}</Text>
    </View>
    {badgeCount ? (
      <View className="bg-red-500 rounded-full w-6 h-6 items-center justify-center">
        <Text className="text-white text-xs font-bold">{badgeCount}</Text>
      </View>
    ) : null}
  </TouchableOpacity>
);
export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-orange-50">
      {/* Header Section */}
      <View className="flex-row justify-end p-4 bg-orange-500">
        <TouchableOpacity className="bg-orange-600 p-2 rounded-full">
          <MaterialIcons name="logout" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Profile Section */}
      <View className="items-center bg-orange-500 py-10 rounded-b-3xl">
        <Image
          source={{ uri: "https://example.com/profile.jpg" }} // Replace with actual profile image URL
          className="w-20 h-20 rounded-full border-2 border-white"
        />
        <Text className="text-lg font-bold text-white mt-3">
          Naila Stefenson
        </Text>
        <Text className="text-base text-orange-200">UX/UI Designer</Text>
      </View>

      {/* Menu Section */}
      <ScrollView className="px-4 mt-4">
        <MenuItem icon="person-outline" label="My Profile" />
        <MenuItem icon="mail-outline" label="Messages" badgeCount={7} />
        <MenuItem icon="heart-outline" label="Favourites" />
        <MenuItem icon="location-outline" label="Location" />
        <MenuItem icon="settings-outline" label="Settings" />
      </ScrollView>
    </View>
  );
}
