import React, { useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextLayoutEventData,
  View,
} from "react-native";

type Props = {
  children: React.ReactNode;
  numberOfLines?: number;
};

export const ReadMore = ({ children, numberOfLines = 3 }: Props) => {
  const [textshown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textshown);
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines);
  };

  return (
    <View>
      <Text
        onTextLayout={onTextLayout}
        numberOfLines={textshown ? undefined : numberOfLines}
      >
        {children}
      </Text>
      {lengthMore ? (
        <Text onPress={toggleNumberOfLines} className="mt-1 text-[#969696]">
          {textshown ? "Read less" : "Read more"}
        </Text>
      ) : null}
    </View>
  );
};
