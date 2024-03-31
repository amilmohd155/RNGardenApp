import { Link, Stack, useLocalSearchParams } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="flex-1 items-center justify-center">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation }) => {
            return (
              <View className="flex-row items-center justify-between w-full p-5">
                <Text>Hello world</Text>
              </View>
            );
          },
        }}
      />
      <Link href={`/${id}/edit`} push>
        Edit
      </Link>
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
