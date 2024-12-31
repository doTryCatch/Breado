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
          Sweet Delights Bakery
        </Text>
      </View>

      {/* About the Bakery Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          About Us
        </Text>
        <Text className="text-base text-gray-600 leading-relaxed">
          At Sweet Delights Bakery, we pride ourselves on crafting the finest
          cakes, pastries, and treats, all made with love and the freshest
          ingredients. Our passion for baking is matched only by our commitment
          to delivering sweet experiences to our customers. Whether you're
          celebrating a special occasion or simply craving something delightful,
          we're here to make every moment a little sweeter.
        </Text>
      </View>

      {/* Owner/Manager Section */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Meet the Owner
        </Text>
        <View className="flex-row items-center">
          <Image
            source={{ uri: "https://randomuser.me/api/portraits/men/1.jpg" }} // Placeholder for the owner's image
            className="w-16 h-16 rounded-full border-2 border-gray-200 mr-4"
            resizeMode="cover"
          />
          <View>
            <Text className="text-lg font-semibold text-gray-800">
              John Doe
            </Text>
            <Text className="text-sm text-gray-600">Owner & Chief Baker</Text>
          </View>
        </View>
        <Text className="text-base text-gray-600 leading-relaxed mt-4">
          John Doe has always had a passion for baking. With over 10 years of
          experience in the industry, John started Sweet Delights Bakery with
          the goal of providing high-quality, delicious treats to his community.
          He believes that the best ingredients and a love for the craft make
          the difference in every bite.
        </Text>
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
          At Sweet Delights Bakery, our mission is to create delicious treats
          that bring joy and satisfaction to our customers. We believe in the
          power of food to bring people together, and we strive to make every
          bite a moment of happiness.
        </Text>
      </View>

      {/* Contact or Location Section (optional) */}
      <View className="mb-8">
        <Text className="text-lg font-semibold text-gray-700 mb-2">
          Visit Us
        </Text>
        <Text className="text-base text-gray-600">
          We're located at: 123 Bakery Street, Sweet City, ABC 12345
        </Text>
      </View>
    </ScrollView>
  );
}
