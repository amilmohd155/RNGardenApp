import { Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

export const ImageCard = ({}) => {
  return (
    <Pressable className="my-5 items-center rounded-xl bg-[#eeeeee] py-10 active:bg-[#c6c5c5]">
      <Ionicons name="camera" size={50} color="#000" />
      <Text className="text-center text-2xl font-bold text-[#9c9b9c]">
        Tap to upload the photo
      </Text>
    </Pressable>
  );
};
