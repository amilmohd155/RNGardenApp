import "ts-node/register";
import { ExpoConfig, ConfigContext } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "Garden",
  slug: "garden",
  userInterfaceStyle: "automatic",
  android: {
    googleServicesFile:
      process.env.GOOGLE_SERVICES_FILE || "./google-services.json",
    package: "com.docren.garden",
  },
});
