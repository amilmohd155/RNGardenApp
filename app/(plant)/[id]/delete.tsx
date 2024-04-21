import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function DeletePlantScreen() {
  const { id } = useLocalSearchParams();

  console.log("DeletePlantScreen", id);

  return (
    <View
      className="h-1/2 items-center justify-center bg-black"
      //   style={{ backgroundColor: "transparent" }}
    >
      <Text>{`Delete Plant Screen ${id}`} </Text>
    </View>
  );
}
