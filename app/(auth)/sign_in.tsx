import React, { useState } from "react";
import {
  View,
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { API } from "@/config";
import { useAuth } from "@/middleware/auth";
import { useRouter } from "expo-router";
const Login = () => {
  const router = useRouter();
  const { logIn, loadUserData } = useAuth();
  const [isloading, setIsloading] = useState(false);
  const [loginCredentials, setLoginCredentials] = useState({
    phone: "",
    password: "",
  });

  const [errorMsg, setErrorMsg] = useState("");
  const handleLogin = async () => {
    setIsloading(true);

    try {
      const response = await axios.post(API.LOGIN, loginCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true, // Ensures cookies are sent and received
      });
      setErrorMsg(response.data.message);
      if (response.data.success) {
        setIsloading(false);
        setTimeout(() => {
          setErrorMsg("");
          router.push("/");
        }, 1000);

        loadUserData(response.data.data);
        logIn();
      }
      console.log("Login successful:", response.data);
    } catch (error) {
      console.error("Error logging in:", error.response?.data || error.message);
    }
  };

  return (
    <View className="flex-1 mb-5 bg-[#F3F3F4] items-center justify-center px-5">
      {errorMsg && (
        <View className="p-4 bg-white text-red-800">
          <Text>{errorMsg}</Text>
        </View>
      )}
      {!errorMsg && isloading && (
        <View className="flex-1 justify-center items-center bg-gray-100">
          <ActivityIndicator size="large" color="#FF6347" />
          <Text className="mt-4 text-gray-700">logging In...</Text>
        </View>
      )}
      {/* Logo */}
      <View className="mb-10">
        <Text className="text-4xl font-bold text-[#FF9F0A]">Breado</Text>
      </View>
      {/* Title */}
      <Text className="text-lg text-gray-800 mb-5">Log in to Breado</Text>
      {/* Email Input */}
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4 text-base text-gray-800 shadow-md"
        placeholder="Enter Phone Number"
        keyboardType="numeric"
        value={loginCredentials.phone}
        placeholderTextColor="#B3B3B3"
        onChangeText={(text) =>
          setLoginCredentials({
            ...loginCredentials,
            phone: text,
          })
        }
      />
      {/* Password Input */}
      <TextInput
        className="w-full bg-white p-4 rounded-lg mb-4 text-base text-gray-800 shadow-md"
        placeholder="Password"
        placeholderTextColor="#B3B3B3"
        value={loginCredentials.password}
        onChangeText={(text) =>
          setLoginCredentials({ ...loginCredentials, password: text })
        }
        secureTextEntry={true}
      />
      {/* Sign In Button */}
      <TouchableOpacity
        className="w-full bg-[#FF9F0A] p-4 rounded-lg items-center mb-5"
        onPress={handleLogin}
      >
        <Text className="text-white text-base font-bold">Sign In</Text>
      </TouchableOpacity>
      {/* Sign Up Text */}
      <Text style={{ fontSize: 14, color: "gray" }}>
        Don't have an account?{" "}
        <TouchableOpacity onPress={() => router.push("/sign_up")}>
          <Text style={{ color: "#FF9F0A", fontWeight: "bold" }}>Sign Up</Text>
        </TouchableOpacity>
      </Text>{" "}
    </View>
  );
};

export default Login;
