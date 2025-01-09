import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/middleware/auth";
import { CacheProvider } from "@/middleware/cache";
import { NetworkProvider } from "@/middleware/network";
export default function RootLayout() {
  return (
    <AuthProvider>
      <NetworkProvider>
        {" "}
        <CacheProvider>
          <Stack>
            <Stack.Screen name="(drawer)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="product" options={{ headerShown: false }} />
            <Stack.Screen
              name="(auth)/sign_in"
              options={{ headerTitle: "Login" }}
            />
            <Stack.Screen
              name="(auth)/sign_up"
              options={{ headerTitle: "SignUp" }}
            />
            <Stack.Screen
              name="about/index"
              options={{ headerTitle: "About Us" }}
            />
            <Stack.Screen
              name="seller/index"
              options={{ headerTitle: "All Sellers" }}
            />

            <Stack.Screen
              name="dashboard/index"
              options={{ headerTitle: "Dashboard" }}
            />
            <Stack.Screen
              name="allproducts/index"
              options={{ headerTitle: "All Products" }}
            />
            <Stack.Screen
              name="profile/index"
              options={{ headerTitle: "Profile" }}
            />
            <Stack.Screen
              name="product/[id]"
              options={{ headerTitle: "Product Info" }}
            />
          </Stack>
        </CacheProvider>
      </NetworkProvider>
    </AuthProvider>
  );
}
