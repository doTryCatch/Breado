import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { useRouter } from "expo-router";
import { Image, View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Add icons
import { images } from "@/constants";
import { useAuth } from "@/middleware/auth";

function CustomDrawerContent(props: any) {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContent}>
      <View className="flex-row">
        <Image
          source={images.logo}
          className="w-[150px] h-[60px]"
          resizeMode="contain"
        />

        <View className="mb-10 items-center justify-center">
          <Text className="text-4xl font-bold text-[#FF9F0A] text-center -ml-5">
            Breado
          </Text>
        </View>
      </View>

      <DrawerItemList {...props} />

      {user.role === "manager" && (
        <>
          <DrawerItem
            label="Profile"
            labelStyle={styles.drawerItemLabel}
            onPress={() => router.push("profile")}
            icon={() => (
              <Ionicons name="person-circle" size={24} color="#333" />
            )}
          />

          <DrawerItem
            label="Dashboard"
            labelStyle={styles.drawerItemLabel}
            onPress={() => router.push("dashboard")}
            icon={() => <Ionicons name="analytics" size={24} color="#333" />}
          />
          <DrawerItem
            label="Sellers"
            labelStyle={styles.drawerItemLabel}
            onPress={() => router.push("seller")}
            icon={() => <Ionicons name="person" size={24} color="#333" />}
          />
          <DrawerItem
            label="All Products"
            labelStyle={styles.drawerItemLabel}
            onPress={() => router.push("allproducts")}
            icon={() => <Ionicons name="basket" size={24} color="#333" />}
          />
        </>
      )}

      <DrawerItem
        label="About Us"
        labelStyle={styles.drawerItemLabel}
        onPress={() => router.push("about")}
        icon={() => (
          <Ionicons name="information-circle" size={24} color="#333" />
        )}
      />
    </DrawerContentScrollView>
  );
}

export default function DrawerLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer
        screenOptions={{
          headerShown: false, // Hide default header
          drawerStyle: styles.drawer, // Apply custom drawer styles
          drawerLabelStyle: styles.drawerLabel, // Customize label style
          drawerActiveBackgroundColor: "#f0f0f0", // Highlight active item with a background color
          drawerActiveTintColor: "#1e90ff", // Active item text color
          drawerInactiveTintColor: "#333", // Inactive item text color
        }}
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="(tabs)"
          options={{
            headerTitle: "Home", // Custom title for the drawer screen
            drawerLabel: "Home", // Drawer item label for this screen
            drawerIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  drawer: {
    width: "75%", // Customize width of the drawer
    backgroundColor: "#ffffff", // Set drawer background color
  },
  drawerContent: {
    backgroundColor: "#f4f4f4", // Light background color for drawer content
    paddingTop: 20,
  },
  header: {
    paddingLeft: 20,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  tagline: {
    fontSize: 14,
    color: "#777",
    marginTop: 4,
  },
  drawerItemLabel: {
    fontSize: 16,
    fontWeight: "500", // Slightly lighter font weight
    marginLeft: 0, // Remove extra padding for label
    color: "#333", // Default text color for labels
  },
  drawerLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
});
