import { Stack } from "expo-router";
import "../global.css";
import { AuthProvider } from "@/middleware/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="prodcut" options={{ headerShown: false }} />
        <Stack.Screen
          name="(auth)/sign_in"
          options={{ headerTitle: "Login" }}
        />
      </Stack>
    </AuthProvider>
  );
}
