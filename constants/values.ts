import { RadioOption } from "@/components/RadioButton";

export const blurhash =
  "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

export enum LIGHT_CONDITIONS {
  BRIGHT_INDIRECT = "Bright Indirect",
  BRIGHT_DIRECT = "Bright Direct",
  LOW_LIGHT = "Low Light",
}

export const LightConditionsAsArray = [
  "Bright Indirect",
  "Bright Direct",
  "Low Light",
] as const;

export const LightConditionsRadioOptions: RadioOption[] =
  LightConditionsAsArray.map(
    (condition) => ({ label: condition, value: condition }) as RadioOption,
  );

export const FIELD_REQUIRED_STR = "This field is required";
