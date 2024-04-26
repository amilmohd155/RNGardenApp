import * as FileSystem from "expo-file-system";
import { useEffect, useState } from "react";

import { Body } from "@/types/plantApi";
import { ensureDirExists } from "@/utils";
import { usePlantActions } from "./usePlantStore";

export const imageDirectory = FileSystem.documentDirectory + "images/";

const apiKey: string = process.env.EXPO_PUBLIC_API_KEY!;
const apiURL = process.env.EXPO_PUBLIC_API_URL!;

const getPlantDetailsURL = `${apiURL}/identification?details=common_names,url,description,image,watering`;

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

function getFileExtension(filename: string): string {
  // Split the filename by periods to get an array of substrings
  const parts = filename.split(".");

  // If there are multiple parts and the last part is not empty, return the last part (extension)
  if (parts.length > 1 && parts[parts.length - 1] !== "") {
    return parts[parts.length - 1];
  } else {
    // If there's no valid extension, return an empty string or handle it as per your requirement
    return "jpeg";
  }
}

type FileSystemHook = {
  saveImage: (uri: string) => Promise<string | undefined>;
  getPlantDetails: (uri: string) => Promise<any>;
  deleteImage: (val: string, isUri: boolean) => Promise<void>;
  uploading: boolean;
  loading: boolean;
};

/**
 * Custom hook for interacting with the file system.
 * Provides functions for saving images and getting plant details.
 *
 * @returns An object containing the following functions and state:
 *   - loading: A boolean indicating whether an operation is in progress.
 *   - saveImage: A function that saves an image to the file system.
 *   - uploading: A boolean indicating whether an upload is in progress.
 *   - getPlantDetails: A function that retrieves plant details from an API.
 */
export const useFileSystem = (): FileSystemHook => {
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const { getById } = usePlantActions();

  useEffect(() => {
    ensureDirExists(imageDirectory);
  }, []);

  //   !TODO: Possible change to params and filename extension

  /**
   * Saves an image to the file system.
   * @param uri The URI of the image to save.
   * @returns The path to the saved image, or undefined if an error occurred.
   * @async
   * @function saveImage
   */
  const saveImage = async (uri: string) => {
    const filename = new Date().getTime() + "." + getFileExtension(uri); //Change considered ( get filename extension from params )
    const dest = imageDirectory + filename;
    setLoading(true);
    try {
      await FileSystem.copyAsync({ from: uri, to: dest });
      return dest;
    } catch (error) {
      console.log("Error saving image: ", error);

      return undefined;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Retrieves plant details from an API.
   * @param uri The URI of the image to analyze.
   * @returns The plant details, or undefined if an error occurred.
   * @async
   * @function getPlantDetails
   */
  const getPlantDetails = async (uri: string) => {
    setUploading(true);

    try {
      const response = await FileSystem.uploadAsync(
        getPlantDetailsURL,
        uri,
        options,
      );

      if (response.status !== 201) {
        console.log("Error getting plant details: ", response);
        throw new Error(`Server responded with status ${response.status}`);
      }
      const data: Body = JSON.parse(response.body);

      const {
        access_token: plantAccessToken,
        result: {
          is_plant: { binary: isPlant },
          classification: { suggestions },
        },
      } = data;

      const {
        name,
        details: {
          common_names: commonNames,
          description: { value: description, citation: descriptionCitation },
          image,
          watering,
        },
      } = suggestions[0];

      return {
        plantAccessToken,
        isPlant,
        commonNames,
        description,
        descriptionCitation,
        image,
        name,
        watering,
      };
    } catch (error) {
      console.log("Error getting plant details: ", error);

      return undefined;
    } finally {
      setUploading(false);
    }
  };

  const deleteImage = async (val: string, isUri: boolean) => {
    if (!isUri) {
      const uri = getById(val)?.image;
      console.log("Deleting image: ", uri);

      uri && (await FileSystem.deleteAsync(uri));
      return;
    }

    await FileSystem.deleteAsync(val);
  };

  return {
    saveImage,
    uploading,
    loading,
    getPlantDetails,
    deleteImage,
  };
};
