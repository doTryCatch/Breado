import React from "react";
import { View, Text, Image, ScrollView } from "react-native";

// Assuming you have a logo image for your bakery
import { images } from "@/constants"; // Make sure you have the correct path to your images

export default function About() {
  return (
    <ScrollView className="flex-1 bg-gray-50 p-4">
      {/* Bakery Logo Section */}
      <View className="items-center mb-6">
        <Image
          source={images.bread} // Assuming you have a bakery logo image in your constants/images folder
          className="w-32 h-32 rounded-full"
          resizeMode="contain"
        />
        <Text className="text-2xl font-semibold text-gray-800 mt-4">
          Kishan Pauroti Udyog
        </Text>
      </View>

      {/* About the Bakery Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          About Us
        </Text>
        <Text className="text-base text-gray-600 leading-relaxed">
          Kishan Pauroti Udyog is a small-scale bread factory located in
          Rauwahi, Devtal-6, Bara district, Province 2, Nepal. With a team of 12
          dedicated staff, we specialize in crafting fresh and delicious baked
          goods. Our aim is to establish a bakery brand that resonates with
          quality and taste in the world of baking. From classic breads to
          flavorful pastries, we strive to bring joy to every customer with
          every bite.
        </Text>
      </View>

      {/* Owner/Manager Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Meet the Team
        </Text>
        <View className="flex-row items-center mb-4">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/2.jpg" }} // Placeholder for owner's image
            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-semibold text-gray-800">
              Manjay Kumar Patel
            </Text>
            <Text className="text-sm text-gray-600">Owner</Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/3.jpg" }} // Placeholder for manager's image
            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-semibold text-gray-800">
              Gajendra Patel
            </Text>
            <Text className="text-sm text-gray-600">Manager</Text>
          </View>
        </View>
      </View>

      {/* Mission/Motto Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Our Mission
        </Text>
        <Text className="text-base text-gray-600 italic">
          "Baking Happiness Into Every Bite."
        </Text>
        <Text className="text-base text-gray-600 leading-relaxed mt-4">
          At Kishan Pauroti Udyog, our mission is to create a bakery brand that
          stands for quality and taste. We are committed to producing delicious
          products that satisfy our customers and help us make a mark in the
          world of baking. By combining tradition with innovation, we aim to
          bring fresh, high-quality baked goods to every table.
        </Text>
      </View>

      {/* Contact or Location Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Visit Us
        </Text>
        <Text className="text-base text-gray-600">
          We're located at: Rauwahi, Devtal-6, Bara district, Province 2, Nepal
        </Text>
        <Text className="text-base text-gray-600 mt-4">
          For inquiries, please contact us. We're happy to assist you!
        </Text>
      </View>
    </ScrollView>
  );
}
