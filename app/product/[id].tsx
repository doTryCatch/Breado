import { Text, View } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
export default function ProfileScreen() {
  const route = useRoute();
  const { id } = route.params;
  return (
    <View>
      <Text>this is product of id {id} </Text>
      <Link href="/">
        <Text>go to homePage</Text>{" "}
      </Link>
    </View>
  );
}
