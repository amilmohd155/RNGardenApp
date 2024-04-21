import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

export default function EditPlantScreen() {
  const { id } = useLocalSearchParams();

  console.log("EditPlantScreen", id);

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{`Edit Plant Screen ${id}`} </Text>
    </View>
  );
}
