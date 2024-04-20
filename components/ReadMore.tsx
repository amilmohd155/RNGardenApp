import React, { PropsWithChildren, useState } from "react";
import {
  NativeSyntheticEvent,
  Text,
  TextLayoutEventData,
  TextProps,
  View,
} from "react-native";

type Props = {
  citation?: string | null;
  numberOfLines?: number;
  textClassName?: string;
  readMoreClassName?: string;
  citationClassName?: string;
} & TextProps;

export const ReadMore = ({
  numberOfLines = 3,
  citation,
  children,
  className,
  textClassName = "text-onSurfaceVariant",
  citationClassName = "text-right italic text-onSurfaceVariant/50",
  readMoreClassName = "text-onSurface/50",
  ...props
}: PropsWithChildren<Props>) => {
  const [textshown, setTextShown] = useState(false);
  const [lengthMore, setLengthMore] = useState(false);

  const toggleNumberOfLines = () => {
    setTextShown(!textshown);
  };

  const onTextLayout = (e: NativeSyntheticEvent<TextLayoutEventData>) => {
    setLengthMore(e.nativeEvent.lines.length >= numberOfLines);
  };

  return (
    <View className={className}>
      <Text
        {...props}
        className={textClassName}
        onTextLayout={onTextLayout}
        numberOfLines={textshown ? undefined : numberOfLines}
      >
        {children}
      </Text>
      <View className="flex-row items-center justify-between py-2">
        {lengthMore ? (
          <Text onPress={toggleNumberOfLines} className={readMoreClassName}>
            {textshown ? "Read less" : "Read more"}
          </Text>
        ) : null}
        {/* Citation */}
        {citation && <Text className={citationClassName}>{citation}</Text>}
      </View>
    </View>
  );
};
