import {
  MaterialCommunityIcons,
  Ionicons,
  Feather,
  FontAwesome,
} from "@expo/vector-icons";
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
  cssInterop(FontAwesome, {
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
};
