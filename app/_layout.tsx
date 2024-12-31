import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/middleware/auth";
import { CacheProvider } from "@/middleware/cache";
export default function RootLayout() {
  return (
    <AuthProvider>
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
        </Stack>
      </CacheProvider>
    </AuthProvider>
  );
}
