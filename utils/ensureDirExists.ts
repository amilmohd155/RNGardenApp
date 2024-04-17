import * as FileSystem from "expo-file-system";

export const ensureDirExists = async (dir: string) => {
  const dirInfo = await FileSystem.getInfoAsync(dir);
  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(dir, { intermediates: true });
  }
};
