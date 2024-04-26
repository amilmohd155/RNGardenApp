import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const removeScheduledNotification = async (identifier: string) => {
  await Notifications.cancelScheduledNotificationAsync(identifier);
};

const schedulePushNotification = async (
  request: Notifications.NotificationRequestInput,
) => {
  const indentifier = await Notifications.scheduleNotificationAsync({
    ...request,
    // identifier: "test",
    // content: {
    //   title: "You've got mail! 📬",
    //   subtitle: "It's been a while since you used the app.",
    //   body: "Here is the notification body",
    //   data: { data: "goes here" },
    // },
    // trigger: { seconds: 2 },
  });

  return indentifier;
};

async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
      showBadge: true,
      enableLights: true,
      enableVibrate: true,
    });
  }

  let token: Notifications.ExpoPushToken | undefined;

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }

    const projectId =
      Constants.expoConfig?.extra?.eas.projectId ??
      Constants.easConfig?.projectId;

    token = await Notifications.getExpoPushTokenAsync({ projectId });
  } else {
    alert("This is a simulator, push notifications are not supported");
  }

  return token;
}

export {
  registerForPushNotificationsAsync,
  schedulePushNotification,
  removeScheduledNotification,
};
