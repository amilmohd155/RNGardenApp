import { Pressable, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";

export const ImageCard = ({}) => {
  return (
    <Pressable className="items-center bg-[#eeeeee] rounded-xl my-5 py-10 active:bg-[#c6c5c5]">
      <Ionicons name="camera" size={50} color="#000" />
      <Text className="text-center text-2xl font-bold text-[#9c9b9c]">
        Tap to upload the photo
      </Text>
    </Pressable>
  );
};
