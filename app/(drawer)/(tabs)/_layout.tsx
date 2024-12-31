import { Tabs } from "expo-router";
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
      }}
    >
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen
        name="products"
        options={{
          headerTitle: "Products",
        }}
      />
      <Tabs.Screen
        name="order"
        options={{
          headerTitle: "Place an Order",
          tabBarItemStyle: isLoggedIn ? undefined : { display: "none" },
        }}
      />
      <Tabs.Screen
        name="record"
        options={{
          headerTitle: "Oders Record",
          tabBarItemStyle: isLoggedIn ? undefined : { display: "none" },
        }}
      />
    </Tabs>
  );
}
