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
  Image,
} from "react-native";
import axios from "axios";
import { Ionicons } from "@expo/vector-icons"; // Add expo icons for the add icon
import { API } from "@/config";
import { fetchData } from "@/utils";
import { useCache } from "@/middleware/cache";

interface ProductRecord {
  product_id: number;
  name: string;
  price: number;
  image: string; // Assuming each product has an image URL
}

interface Product {
  name: string;
  price: number;
  category: string;
  description: string;
}

export default function AllProducts() {
  const { getCacheData, setCacheData } = useCache();
  const [products, setProducts] = useState<ProductRecord[]>([]);
  const [loadingProductData, setLoadingProductData] = useState(true);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    category: "",
    description: "",
  });
  const [formMessage, setFormMessage] = useState<string | null>(null);

  const [editingProduct, setEditingProduct] = useState<number | null>(null);
  const [updatedPrice, setUpdatedPrice] = useState<string>("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const cachedProducts = await getCacheData("products");
        if (cachedProducts) {
          setProducts(cachedProducts);
        } else {
          const fetchedProducts = await fetchData(API.getProducts);
          setCacheData("products", fetchedProducts);
          setProducts(fetchedProducts);
        }
      } catch (error: any) {
        console.error("Error fetching products:", error.message);
      } finally {
        setLoadingProductData(false);
      }
    };
    fetchProducts();
  }, [getCacheData, setCacheData]);

  const handleAddProduct = async () => {
    try {
      const response = await axios.post(API.addProduct, newProduct, {
        headers: { "Content-Type": "application/json" },
      });

      const updatedProducts = await fetchData(API.getProducts);
      setProducts(updatedProducts);
      setCacheData("products", updatedProducts);

      setFormMessage(response.data.message);
      setNewProduct({
        name: "",
        price: 0,
        category: "",
        description: "",
      });
    } catch (error: any) {
      setFormMessage(
        error.response?.data?.message ||
          "Failed to add product. Please try again.",
      );
    }
  };

  const handleUpdatePrice = (productId: number) => {
    if (!updatedPrice || isNaN(Number(updatedPrice))) {
      Alert.alert("Error", "Please enter a valid price.");
      return;
    }

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId
          ? { ...product, price: Number(updatedPrice) }
          : product,
      ),
    );
    setUpdatedPrice("");
    setEditingProduct(null);
    Alert.alert(
      "Price Updated",
      "The product price has been updated successfully!",
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="flex-row justify-between items-center p-4 bg-white shadow-md">
        <Text className="text-2xl font-semibold text-gray-800">
          All Products
        </Text>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Ionicons name="add-circle" size={32} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      {loadingProductData ? (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#FF6347" />
          <Text className="mt-4 text-gray-700">Loading data...</Text>
        </View>
      ) : products.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-600">No records yet</Text>
        </View>
      ) : (
        <ScrollView
          alwaysBounceVertical
          className="flex-1 p-4 max-h-[85vh]"
          showsVerticalScrollIndicator={false}
        >
          {products.map((product) => (
            <View
              key={product.product_id}
              className="bg-white p-4 mb-4 rounded-lg shadow-md flex-row items-center"
            >
              <View className="flex-1">
                <Text className="text-lg font-semibold text-gray-800">
                  {product.name}
                </Text>
                <Text className="text-lg font-semibold text-gray-800">
                  ${product.price}
                </Text>

                <TouchableOpacity
                  onPress={() => setEditingProduct(product.product_id)}
                  className="bg-yellow-500 p-2 rounded-lg mt-2"
                >
                  <Text className="text-white text-center">Edit Price</Text>
                </TouchableOpacity>

                {editingProduct === product.product_id && (
                  <View className="mt-4">
                    <TextInput
                      value={updatedPrice}
                      onChangeText={setUpdatedPrice}
                      placeholder="Enter new price"
                      keyboardType="numeric"
                      className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
                    />
                    <TouchableOpacity
                      onPress={() => handleUpdatePrice(product.product_id)}
                      className="bg-green-500 p-3 rounded-lg"
                    >
                      <Text className="text-white text-center">
                        Update Price
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>

              <Image
                source={{ uri: product.image }}
                className="w-24 h-24 ml-4 rounded-lg"
                resizeMode="cover"
              />
            </View>
          ))}
        </ScrollView>
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
          <View className="bg-white w-11/12 p-6 rounded-lg">
            <Text className="text-xl font-semibold text-gray-800 mb-4">
              Add New Product
            </Text>
            {formMessage && (
              <Text className="text-center mb-4 text-red-500">
                {formMessage}
              </Text>
            )}

            <TextInput
              value={newProduct.name}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, name: text })
              }
              placeholder="Enter Product Name"
              className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
            />
            <TextInput
              value={String(newProduct.price)}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, price: parseFloat(text) || 0 })
              }
              placeholder="Enter Price"
              keyboardType="numeric"
              className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
            />
            <TextInput
              value={newProduct.category}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, category: text })
              }
              placeholder="Enter Category"
              className="border border-gray-300 rounded-lg p-3 mb-4 text-gray-700"
            />
            <TextInput
              value={newProduct.description}
              onChangeText={(text) =>
                setNewProduct({ ...newProduct, description: text })
              }
              placeholder="Enter Description"
              className="border border-gray-300 rounded-lg p-3 mb-6 text-gray-700"
            />

            <TouchableOpacity
              onPress={handleAddProduct}
              className="bg-green-500 p-4 rounded-lg mb-4"
            >
              <Text className="text-white text-center">Submit</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsModalVisible(false)}>
              <Text className="text-blue-500 text-center">Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
