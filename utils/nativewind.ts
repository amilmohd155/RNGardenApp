import { MaterialCommunityIcons, Ionicons, Feather } from "@expo/vector-icons";
import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Image } from "expo-image";
import { cssInterop, remapProps } from "nativewind";
import { ImageBackground, TextInput } from "react-native";

export default () => {
  cssInterop(Image, { className: "style" });
  remapProps(ImageBackground, {
    className: "style",
    imageClassName: "imageStyle",
  });
  cssInterop(TextInput, {
    className: {
      target: "style",
    },
  });
  cssInterop(Feather, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: "color",
      },
    },
  });
  cssInterop(MaterialCommunityIcons, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: "color",
      },
    },
  });
  cssInterop(Ionicons, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: "color",
      },
    },
  });

  cssInterop(SegmentedControl, {
    className: {
      target: "style",
      nativeStyleToProp: {
        tintColor: "tintColor",
        backgroundColor: "backgroundColor",
      },
    },
  });
};
