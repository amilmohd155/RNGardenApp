import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { FontAwesome6 } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center bg-[#eff3ec]">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation }) => {
            return (
              <View className="flex-row items-center justify-between w-full p-5">
                <Ionicons
                  name="arrow-back"
                  size={24}
                  color="#59746f"
                  className="bg-white p-2 rounded-full"
                  onPress={() => navigation.goBack()}
                />
                <Link href={`/${id}/edit`} asChild>
                  <FontAwesome6
                    name="edit"
                    size={24}
                    color="#59746f"
                    className="bg-white p-2 rounded-full"
                  />
                </Link>
              </View>
            );
          },
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
