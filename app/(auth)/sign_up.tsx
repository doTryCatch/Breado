import { Text, View } from "react-native";
import { Link } from "expo-router";
export default function signUpScreen() {
  return (
    <View>
      <Text>this is signup page </Text>
      <Link href="/"> go to homePage </Link>
    </View>
  );
}
