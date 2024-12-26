import React from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import axios from "axios";
import { useAuth } from "@/middleware/auth";
const Login = () => {
  const { logIn } = useAuth();
  const handleLogin = async () => {
    console.log("login handler is active");
    try {
      const response = await axios.post(
        "https://d495-103-232-154-95.ngrok-free.app/auth/login",
        { email: "rp207045@gmail.com", password: "roshan12##" },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // Ensures cookies are sent and received
        },
      );
      if (response.data.success) logIn();
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <View className="flex-1 bg-[#F3F3F4] items-center justify-center px-5">
      {/* Logo */}
      <View className="mb-10">
        <Text className="text-4xl font-bold text-[#FF9F0A]">Breado</Text>
      </View>

      {/* Title */}
      <Text className="text-lg text-gray-800 mb-5">Log in to Breado</Text>

      {/* Email Input */}
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4 text-base text-gray-800 shadow-md"
        placeholder="Email"
        placeholderTextColor="#B3B3B3"
      />

      {/* Password Input */}
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4 text-base text-gray-800 shadow-md"
        placeholder="Password"
        placeholderTextColor="#B3B3B3"
        secureTextEntry
      />

      {/* Sign In Button */}
      <TouchableOpacity
        className="w-full bg-[#FF9F0A] p-4 rounded-lg items-center mb-5"
        onPress={handleLogin}
      >
        <Text className="text-white text-base font-bold">Sign In</Text>
      </TouchableOpacity>

      {/* Sign Up Text */}
      <Text className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Text className="text-[#FF9F0A] font-bold">Signup</Text>
      </Text>
    </View>
  );
};

export default Login;
