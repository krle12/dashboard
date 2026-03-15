import {
  InputHTMLAttributes,
  SelectHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";

export type Perfume = {
  id: string;
  name: string;
  brand: string;
  quantity: number;
  price: number;
  gender: "muski" | "zenski" | "unisex";
  image_url: string | null;
  description: string | null;
  created_at?: string;
};

export type ActionState = {
  success?: boolean;
  error?: string;
  message?: string;
} | null;

export type PageSearchParams = Promise<{
  page?: string;
  gender?: string;
  error?: string;
}>;

export type GetPerfumesParams = {
  page?: number;
  gender?: string;
  itemsPerPage?: number;
  onlyAvailable?: boolean;
};

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: readonly { id: string; label: string }[];
}

export interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
}

export type PerfumeFormProps = {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  initialData?: Perfume;
};
