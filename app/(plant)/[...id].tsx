import { Link, useLocalSearchParams } from "expo-router";
import { Text, View } from "@/components/Themed";

import EditScreenInfo from "@/components/EditScreenInfo";
import { StyleSheet } from "react-native";

export default function EditPlantScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View className="flex-1 justify-center items-center">
      <Text style={styles.title}>{`Edit Plant Screen ${id[0]}`} </Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      {/* <EditScreenInfo path="app/(tabs)/settings/index.tsx" /> */}
      <Link
        href="/settings/one"
        push
        onPress={() => console.log("Link to /settings")}
      >
        One
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
