import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import { View, Text, Pressable } from "react-native";
import DatePicker from "react-native-date-picker";

const Reminder = () => {
  const [time, setTime] = useState(new Date());

  const handleDismiss = useCallback(() => {
    router.dismiss();
  }, []);

  const handleSetReminder = useCallback(() => {
    // console.log("time", `${time.getHours()}:${time.getMinutes()}`);
    console.log("Reminder set for", time);
  }, [time]);

  return (
    <BlurView
      experimentalBlurMethod="dimezisBlurView"
      tint="dark"
      intensity={50}
      className="absolute bottom-0 left-0 right-0 top-0 justify-center p-8"
    >
      <Pressable
        onPress={handleDismiss}
        className="absolute bottom-0 left-0 right-0 top-0 "
        pointerEvents="auto"
      />
      <View className="items-center justify-center gap-2 rounded-xl bg-surfaceBright p-10 shadow-xl shadow-onSurfaceVariant/50">
        <Ionicons name="timer" size={50} className="color-tertiary" />
        <Text className="text-3xl text-onSurfaceVariant">Reminder</Text>
        <Text className="text-center text-lg text-onSurfaceVariant">
          Set a reminder for watering your plant
        </Text>
        <DatePicker
          mode="time"
          date={time}
          onDateChange={setTime}
          minuteInterval={10}
          // is24hourSource="locale"
          style={{ marginVertical: 20 }}
        />
        <View className="flex-row gap-5">
          <Pressable
            onPress={handleSetReminder}
            className="flex-1 flex-row justify-center rounded-lg bg-error-700 p-5"
          >
            <Text className="text-xl font-bold text-onSurfaceVariant">
              Set reminder
            </Text>
          </Pressable>
          <Pressable
            onPress={handleDismiss}
            className="flex-1 flex-row justify-center rounded-lg bg-neutral-500 p-5"
          >
            <Text className="text-xl font-bold text-onSurfaceVariant">
              Cancel
            </Text>
          </Pressable>
        </View>
      </View>
    </BlurView>
  );
};

export default Reminder;
