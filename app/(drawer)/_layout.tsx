// app/(drawer)/_layout.tsx
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";

import { View, Text } from "react-native";
function CustomDrawerContent(props: any) {
  const router = useRouter();

  return (
    <DrawerContentScrollView {...props}>
      <View>
        <Text>Welcome to My App</Text>
        <Text>Your personalized dashboard</Text>
      </View>

      <DrawerItemList {...props} />

      {/* Custom Navigation Button */}

      <DrawerItem label="Dashboard" onPress={() => router.push("dashboard")} />
      <DrawerItem label="Sellers" onPress={() => router.push("seller")} />
      <DrawerItem
        label="AllProducts"
        onPress={() => router.push("allproducts")}
      />

      <DrawerItem label="About Us" onPress={() => router.push("about")} />
    </DrawerContentScrollView>
  );
}
export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false, // Hide default header
          drawerStyle: {
            width: "70%", // Customize width of the drawer
          },
          drawerLabelStyle: {
            fontSize: 18, // Adjust font size for better readability
            fontWeight: "bold",
          },
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: "Home", // Custom title for the drawer screen
            drawerLabel: "Home", // Drawer item label for this screen
          }}
        />{" "}
      </Drawer>
    </GestureHandlerRootView>
  );
}
