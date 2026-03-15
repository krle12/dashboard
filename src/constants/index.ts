export const ITEMS_PER_PAGE = 12;

export const GENDER_OPTIONS = [
  { id: "muski", label: "Muški" },
  { id: "zenski", label: "Ženski" },
  { id: "unisex", label: "Unisex" },
] as const;

export const FILTER_CATEGORIES = [
  { id: "sve", label: "Svi" },
  ...GENDER_OPTIONS,
] as const;

export const STORAGE_BUCKETS = {
  PERFUMES: "perfume-images",
} as const;
