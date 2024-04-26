import { NotificationTriggerInput } from "expo-notifications";

export type Reminder = {
  title: string;
  subtitle: string;
  // optionKey: string;
  trigger: NotificationTriggerInput;

  //   {
  //     hours: number;
  //     minutes: number;
  //     repeats?: boolean;
  //     weekday?: number;
  //   };
};
