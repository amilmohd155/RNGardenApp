export interface Body {
  access_token: string;
  result: Result;
}

export interface Result {
  is_plant: IsPlant;
  classification: Classification;
}

export interface IsPlant {
  probability: number;
  threshold: number;
  binary: boolean;
}

export interface Classification {
  suggestions: Suggestion[];
}

export interface Suggestion {
  id: string;
  name: string;
  probability: number;
  similar_images: SimilarImage[];
  details: Details;
}

export interface SimilarImage {
  id: string;
  url: string;
  similarity: number;
  url_small: string;
  license_name?: string;
  license_url?: string;
  citation?: string;
}

export interface Details {
  common_names: string[];
  url: string;
  description: Description;
  synonyms: string[];
  image: Image;
  watering?: Watering;
  name_authority: string;
  language: string;
  entity_id: string;
}

export interface Description {
  value: string;
  citation: string;
  license_name: string;
  license_url: string;
}

export interface Image {
  value: string;
  citation?: string;
  license_name: string;
  license_url: string;
}

export interface Watering {
  max: number;
  min: number;
}
