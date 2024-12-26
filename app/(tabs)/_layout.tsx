import { Tabs } from "expo-router";
import { useAuth } from "@/middleware/auth";

export default function TabsLayout() {
  const { isLoggedIn } = useAuth();
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ headerShown: false }} />
      <Tabs.Screen
        name="product"
        options={{
          tabBarItemStyle: isLoggedIn ? undefined : { display: "none" },
        }}
      />
      <Tabs.Screen name="order" />
      <Tabs.Screen name="record" />
    </Tabs>
  );
}
