import React, { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { Link } from "expo-router";
import { Avatar } from "react-native-elements";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
} from "react-native";
import { Ionicons, Feather, AntDesign } from "@expo/vector-icons";
import { images } from "../../constants";
import bakeryProducts from "@/constants/product_data";
import { useAuth } from "@/middleware/auth";
export default function App() {
  const { isLoggedIn } = useAuth();
  const router = useRoute();
  const [activeCategory, setActiveCategory] = useState("Cake");
  const categories = [
    { name: "Cake", icon: "🍰" },
    { name: "Pastry", icon: "🥐" },
    { name: "Cup Cake", icon: "🧁" },
    { name: "Donuts", icon: "🍩" },
    { name: "Biscuit", icon: "🍪" },
  ];
  return (
    <View className="flex-1 bg-customGrayh px-4 pt-10">
      {/* Header */}
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#F3F3F4"
        translucent={false}
      />
      <View className="flex-row justify-between items-center mb-4">
        <Ionicons name="menu" size={28} color="black" />
        <View className="relative flex-row gap-4">
          <Ionicons name="cart-outline" size={28} color="black" />
          <View className="login justify-centeri items-center">
            <TouchableOpacity>
              {" "}
              {!isLoggedIn ? (
                <View className="h-12 w-12 rounded-[100%] border border-solid border-black   items-center justify-center -mt-2">
                  <Avatar
                    rounded
                    size="small"
                    source={{
                      uri: "https://randomuser.me/api/portraits/men/1.jpg",
                    }}
                  />
                </View>
              ) : (
                <Link href="/sign_in" className="bg-white  p-2 rounded-md">
                  <Text>Login</Text>
                </Link>
              )}
            </TouchableOpacity>
          </View>
          <View className="absolute top-0 right-0 bg-orange-400 rounded-full w-3 h-3" />
        </View>
      </View>

      {/* Greeting Section */}
      <ScrollView
        className="flex-1 max-h-[85vh] "
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-row  px-4 mt-6">
          <View className=" gap-y-3 w-[60%]">
            <View className="flex-row items-center">
              <Ionicons name="location-outline" size={20} color="black" />
              <Text className="ml-1 text-gray-700 font-semibold">
                Rauwahi, NEPAL
              </Text>
            </View>
            <View className="ml-1 ">
              <Text className="text-[26px]  font-semibold text-gray-800 ">
                what would you like to eat?
              </Text>
            </View>
            <TouchableOpacity>
              <Text className="text-orange-400 font-semibold mb-4">
                View Menu →
              </Text>
            </TouchableOpacity>
          </View>
          <Image
            source={images.homeBread}
            className="absolute w-[200px] h-[200px] right-0"
            resizeMode="contain"
          />
        </View>
        {/* Search Bar */}
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 mt-10 mb-6">
          <Feather name="search" size={20} color="gray" />
          <TextInput
            placeholder="Search here ..."
            className="ml-2 text-gray-700 flex-1"
          />
          <TouchableOpacity className="bg-orange-400 rounded-full p-2">
            <AntDesign name="arrowright" size={18} color="white" />
          </TouchableOpacity>
        </View>
        {/* Discover by Category */}
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-lg font-bold text-gray-800">
            Discover by category
          </Text>
          <TouchableOpacity>
            <Text className="text-orange-400 font-semibold">See All →</Text>
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          className="flex-row mb-6"
        >
          {categories.map((item, index) => (
            <TouchableOpacity
              key={index}
              className={`items-center justify-center rounded-2xl w-20 h-24 mr-4 ${
                item.name === activeCategory ? "bg-orange-100" : "bg-white"
              }`}
              onPress={() => setActiveCategory(item.name)}
            >
              <Text className="text-3xl mb-1">{item.icon}</Text>
              <Text
                className={`text-xs font-semibold ${
                  item.name === activeCategory
                    ? "text-orange-400"
                    : "text-gray-700"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {/* Popular Cakes Section */}
        {Object.entries(bakeryProducts).map(([category, products], index) => (
          <View
            key={index}
            className={"mb-8 " + (activeCategory == category ? "" : " hidden")}
          >
            {/* Category Heading */}
            <Text className="text-xl font-bold text-gray-800 mb-4">
              {category}
            </Text>

            {/* Products List */}
            <View className="product flex flex-row flex-wrap gap-4">
              {products.map((product, productIndex) => (
                <View
                  key={productIndex}
                  className="bg-white p-4 rounded-lg shadow-sm w-[48%]"
                >
                  <Text className="text-lg font-semibold text-gray-900">
                    {product.name}
                  </Text>
                  <Text className="text-sm text-gray-600 mb-2">
                    {product.description}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Price: ${product.price}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Calories: {product.calories}
                  </Text>
                  <Text className="text-sm text-gray-600">
                    Weight: {product.weight}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ))}{" "}
        {/* Placeholder for popular cakes */}
      </ScrollView>
    </View>
  );
}
