import { Text, View } from "@/components/Themed";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";

export default function OneScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>OneScreen</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/settings/one.tsx" />
      {/* <Link href="/settings/one">About</Link> */}
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
