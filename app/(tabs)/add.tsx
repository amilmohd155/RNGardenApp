import { Button, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";

import Colors from "@/constants/Colors";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TabTwoScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView className="flex-1 bg-surface">
        <View className="bg-surface">
          {/* Header */}
          <View className="flex-row gap-5 rounded-b-lg p-5">
            <Pressable className="flex-1 flex-row items-center bg-red-200 rounded-lg p-3 gap-2 justify-center">
              <Text className="text-surface text-xl">Cancel</Text>
              <Ionicons name="close" size={24} color="#DC2626" />
            </Pressable>
            <Pressable className="flex-1 flex-row items-center bg-[#eef0eb] rounded-lg p-3 gap-2 justify-center">
              <Text className="text-surface text-xl">Save</Text>
              <Ionicons name="water" size={24} color="#3e5e5e" />
            </Pressable>
          </View>

          {/* Content */}
          {/* Image */}
          <View className="p-5">
            <View className="items-center bg-[#eeeeee] rounded-lg">
              <Ionicons name="camera" size={64} color="#3e5e5e" />
              <Text className="text-center text-2xl font-bold text-[#a5a5a5]">
                Tap to upload the photo
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
