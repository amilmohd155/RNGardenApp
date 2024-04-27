import { Ionicons } from "@expo/vector-icons";
import { PortalHost } from "@gorhom/portal";
import { cva } from "class-variance-authority";
import { Stack, router, useLocalSearchParams } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FAB } from "@/components";
import { ReadMore } from "@/components/ReadMore";
import { usePlantStore } from "@/hooks/usePlantStore";

export default function PlantScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();

  const plants = usePlantStore((state) =>
    state.plants.find((p) => p.id === id),
  );

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
    descriptionCitation,
  } = plants;

  const iconStyle = cva("{}-[color]: color-onTertiaryContainer")();

  return (
    <View className="flex-1 bg-[#eff3ec]">
      <StatusBar style="dark" animated />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTransparent: true,
          header: ({ navigation }) => {
            return (
              <View
                className="w-full flex-row items-start justify-between p-5"
                style={{ paddingTop: insets.top + 20 }}
              >
                <Ionicons
                  name="arrow-back"
                  size={32}
                  // color="#59746f"
                  className={`${iconStyle} rounded-full bg-tertiaryContainer p-2`}
                  onPress={() => navigation.goBack()}
                />
              </View>
            );
          },
        }}
      />

      {/* Image */}
      <Animated.Image
        sharedTransitionTag={`plant-image-${id}`}
        source={{ uri: image ? image : undefined }}
        className="h-1/3 w-full object-contain"
      />

      {/* Body */}
      <View className="-mt-16 flex-1 gap-5 rounded-t-[32] bg-surface px-5 pt-10">
        {/* Name */}
        <View className="flex items-center gap-2">
          <Text className="text-5xl font-bold text-primary">{alias}</Text>
          <Text className="text-3xl italic text-onSecondaryContainer/60">
            {scientificName}
          </Text>
        </View>

        {/* Details */}
        <View className="gap-y-3 rounded-lg border-2 border-outline p-3">
          <View className="flex-row items-center justify-between">
            {/* Location */}
            <GridItem icon="home" item={room} title="Room" />

            {/* Water portion */}
            <GridItem
              icon="water"
              item={`${portion} ml`}
              title="Water portion"
            />
          </View>

          <View className="flex-row items-center justify-between">
            {/* Watering period */}
            <GridItem
              icon="timer"
              item={`Every ${period} ${period > 1 ? "days" : "day"}`}
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

        {/* Description & Citation */}
        <ReadMore
          numberOfLines={5}
          textClassName={cva("leading-6 text-lg text-onSurfaceVariant")()}
          citation={descriptionCitation}
        >
          {description}
        </ReadMore>

        {/* Note */}
        {notes && (
          <View className="gap-2">
            <Text className="text-2xl font-bold text-onSurface">NOTE</Text>
            <Text className="h-[100] min-h-min rounded-lg border-2 border-outline/50 p-3 text-onSecondaryContainer/50">
              {notes}
            </Text>
          </View>
        )}
      </View>
      <PortalHost name="FABGroup" />
      <FAB.Group
        icon="add"
        actions={[
          {
            icon: "timer-outline",
            label: "Reminder",
            color: "#46c750",
            // size: 24,
            onPress: () => router.push(`/(plant)/${id}/reminder`),
          },
          {
            icon: "create",
            label: "Edit",
            color: "#4d81c5",
            // size: 24,
            onPress: () => router.push(`/(plant)/${id}/edit`),
          },
          {
            icon: "trash",
            label: "Remove",
            color: "#c73423",
            // size: 24,
            onPress: () => router.push(`/(plant)/${id}/delete`),
          },
        ]}
      />
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
