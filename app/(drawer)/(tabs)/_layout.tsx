import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons for tab icons
import { useAuth } from "@/middleware/auth";

export default function TabsLayout() {
  const { isLoggedIn } = useAuth();

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          height: 60,
        },
        headerTitleStyle: { fontWeight: "bold" },
        tabBarStyle: {
          backgroundColor: "#fff", // Set background color of the tab bar
        },
        tabBarLabelStyle: {
          fontSize: 12, // Set font size for labels
          fontWeight: "600", // Font weight for the label
        },
        tabBarActiveTintColor: "#1e90ff", // Active tab label color
        tabBarInactiveTintColor: "#777", // Inactive tab label color
        tabBarIconStyle: {
          fontSize: 20, // Set font size for icons
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          headerTitle: "Products",
          tabBarIcon: ({ color }) => (
            <Ionicons name="cart" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          headerTitle: "Place an Order",
          tabBarItemStyle: isLoggedIn ? undefined : { display: "none" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="clipboard" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          headerTitle: "Orders Record",
          tabBarItemStyle: isLoggedIn ? undefined : { display: "none" },
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
