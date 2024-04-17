import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

import { imageDirectory } from "@/constants/values";
import { ensureDirExists } from "@/utils";

const apiKey: string = process.env.EXPO_PUBLIC_API_KEY!;
const apiURL = process.env.EXPO_PUBLIC_API_URL!;

const options: FileSystem.FileSystemUploadOptions = {
  httpMethod: "POST",
  headers: {
    "Api-Key": apiKey,
    "Content-Type": "multipart/form-data",
  },
  uploadType: FileSystem.FileSystemUploadType.MULTIPART,
  parameters: {
    similar_images: "true",
  },
};

type FileSystemHook = {
  saveImage: (uri: string) => Promise<string | undefined>;
  getPlantDetails: (uri: string) => Promise<any>;
  uploading: boolean;
};

export const useFileSystem = (): FileSystemHook => {
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    ensureDirExists(imageDirectory);
  }, []);

  //   !TODO: Possible change to params and filename extension
  const saveImage = async (uri: string) => {
    const filename = new Date().getTime() + ".jpg"; //Change considered ( get filename extension from params )
    const dest = imageDirectory + filename;
    try {
      await FileSystem.copyAsync({ from: uri, to: dest });
      return dest;
    } catch (error) {
      console.log("Error saving image: ", error);

      return undefined;
    }
  };

  const getPlantDetails = async (uri: string) => {
    setUploading(true);

    try {
      const response = await FileSystem.uploadAsync(apiURL, uri, options);

      const data = await JSON.parse(response.body);
      return data;
    } catch (error) {
      console.log("Error getting plant details: ", error);

      return undefined;
    } finally {
      setUploading(false);
    }
  };

  return {
    saveImage,
    uploading,
    getPlantDetails,
  };
};
