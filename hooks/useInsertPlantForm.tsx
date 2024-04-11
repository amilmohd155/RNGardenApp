import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation } from "expo-router";
import { SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";

import { useEditPlantActions } from "./useEditPlantStore";

import { InsertPlantFieldValues, insertPlantSchema } from "@/lib/form";

export const useInsertPlantForm = () => {
  const { savePlant } = useEditPlantActions();
  const navigation = useNavigation();

  const { ...rest } = useForm<InsertPlantFieldValues>({
    defaultValues: {
      period: 1,
      portion: 100,
      lightCondition: "Bright Indirect",
    },
    mode: "onSubmit",
    resolver: zodResolver(insertPlantSchema),
  });

  const onSubmit: SubmitHandler<InsertPlantFieldValues> = (data) => {
    savePlant(data);
    navigation.goBack();
  };

  const onError: SubmitErrorHandler<InsertPlantFieldValues> = (errors) => {
    console.log(errors);
  };

  return { onSubmit, onError, ...rest };
};
