import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, Stack, useLocalSearchParams, useNavigation } from "expo-router";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { AnimatedImage } from "@/components/AnimatedImage";
import { ReadMore } from "@/components/ReadMore";
import { DATA } from "@/constants/SampleData";
import { blurhash } from "@/constants/values";
import { usePlantActions, usePlantStore } from "@/hooks/usePlantStore";
import { useCallback, useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { useEditPlantActions } from "@/hooks/useEditPlantStore";

const DESCRIPTION =
  'Leucojum vernum, called the spring snowflake, is a species of flowering plant in the family Amaryllidaceae. It is native to central and southern Europe from Belgium to Ukraine. It is considered naturalized in north-western Europe, including Great Britain and parts of Scandinavia, and in the US states of Georgia and Florida. This spring flowering bulbous herbaceous perennial is cultivated as an ornamental for a sunny position. The plant multiplies in favourable conditions to form clumps. Each plant bears a single white flower with greenish marks near the tip of the tepal, on a stem about 10–20 cm (3.9–7.9 in) tall, occasionally more.\nThe Latin specific epithet vernum means "relating to Spring". Its close relative, Leucojum aestivum, flowers in summer.';

const CITATION = "https://en.wikipedia.org/wiki/Leucojum_vernum";

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const navigation = useNavigation();

  // const { image, room, period, alias, scientificName } = DATA[parseInt(id, 10)];

  const plants = usePlantStore((state) =>
    state.plants.find((p) => p.id === id),
  );

  const { deletePlant } = useEditPlantActions();

  const handleDeletePost = useCallback(() => {
    deletePlant(id);

    // Navigate back
    navigation.goBack();
  }, [deletePlant, id, navigation]);

  if (!plants) {
    return null;
  }

  const {
    alias,
    room,
    period,
    image,
    scientificName,
    notes,
    portion,
    lightCondition,
    description,
  } = plants;

  const iconStyle = cva(
    "rounded-full bg-white p-2 {}-[color]: color-primary",
  )();

  return (
    <View className="flex-1 bg-[#eff3ec]">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation }) => {
            return (
              <View
                className="w-full flex-row items-center justify-between p-5"
                style={{ paddingTop: insets.top + 20 }}
              >
                <Ionicons
                  name="arrow-back"
                  size={32}
                  // color="#59746f"
                  className={iconStyle}
                  onPress={() => navigation.goBack()}
                />
                <View className="flex-row items-center gap-3">
                  <Ionicons
                    name="trash"
                    size={32}
                    className={iconStyle}
                    onPress={handleDeletePost}
                  />
                  <Link href={`/${id}/edit`} asChild>
                    <MaterialCommunityIcons
                      name="pencil"
                      size={32}
                      className={iconStyle}
                    />
                  </Link>
                </View>
              </View>
            );
          },
        }}
      />

      {/* Image */}
      <Animated.View sharedTransitionTag="plant-image" className="h-1/3 w-full">
        <Image
          source={image}
          placeholder={blurhash}
          transition={1000}
          contentFit="cover"
          className="flex-1"
        />
      </Animated.View>
      {/* Body */}
      <View className="-mt-16 flex-1 rounded-t-[32] bg-surface px-5 pt-10">
        {/* Name */}
        <View className="flex-row items-center gap-3">
          <Text className="text-5xl font-bold text-primary">{alias}</Text>
          <Text className="text-3xl text-[#a9a1a1]">{scientificName}</Text>
        </View>

        {/* Details */}
        <View className="my-5 gap-y-3 rounded-lg border-2 border-outline p-3">
          <View className="flex-row items-center justify-between">
            {/* Location */}
            <GridItem icon="home" item={room} title="Room" />

            {/* Water portion */}
            <GridItem
              icon="water"
              item={`${portion}ml`}
              title="Water portion"
            />
          </View>

          <View className="flex-row items-center justify-between">
            {/* Watering period */}
            <GridItem
              icon="timer"
              item={`Every ${period} days`}
              title="Watering period"
            />

            {/* Light Condition */}
            <GridItem
              icon="sunny"
              item={lightCondition?.valueOf()}
              title="Light Condition"
            />
          </View>
        </View>

        {/* Description */}

        <View className="my-1">
          <ReadMore numberOfLines={3}>{description?.text}</ReadMore>
          <Text className="text-right italic text-onSecondary">
            {description?.citation}
          </Text>
        </View>

        {/* Note */}
        <View className="my-5 gap-2">
          {/* <Text className="text-2xl font-bold text-onSurface">NOTE</Text> */}
          <Text className="h-[100] min-h-min rounded-lg border-2 border-outline/50 p-3 text-onSecondaryContainer/50">
            {notes}
          </Text>
        </View>
      </View>
    </View>
  );
}

const GridItem = ({
  icon,
  item,
  title,
}: {
  title: string;
  item?: string;
  icon: React.ComponentProps<typeof Ionicons>["name"];
}) => {
  if (!item) {
    return null;
  }
  return (
    <View className="flex-1 flex-row items-center gap-3">
      <Ionicons name={icon} size={20} color="rgb(89 116 111)" />
      <View className="flex-1 gap-1">
        <Text className="text-2xl font-semibold text-onSurface/50">
          {title}
        </Text>
        <Text className="text-onSurfaceVariant/60">{item}</Text>
      </View>
    </View>
  );
};
