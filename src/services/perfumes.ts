import { createClient } from "@/src/database/server";
import { ITEMS_PER_PAGE } from "@/src/constants";
import { GetPerfumesParams, Perfume } from "@/src/types";

export async function getPerfumes({
  page = 1,
  gender = "",
  itemsPerPage = ITEMS_PER_PAGE,
  onlyAvailable = false,
}: GetPerfumesParams = {}) {
  const supabase = await createClient();

  const from = (page - 1) * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from("perfumes")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to);

  if (gender && gender !== "sve") {
    query = query.eq("gender", gender);
  }

  if (onlyAvailable) {
    query = query.gt("quantity", 0);
  }

  try {
    const { data, count, error } = await query;

    if (error) {
      console.error("Supabase error:", error.message);
      throw new Error(
        "An error occurred while processing data from the database.",
      );
    }

    const totalPages = count ? Math.ceil(count / itemsPerPage) : 0;

    return {
      perfumes: data as Perfume[],
      totalPages,
      totalCount: count || 0,
    };
  } catch (err) {
    console.error("Network error in getPerfumes:", err);
    throw new Error(
      "Unable to connect to the server. Please check your internet connection.",
    );
  }
}

export async function getPerfumeById(id: string): Promise<Perfume | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("perfumes")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) {
    console.error(`Error loading perfume with ID ${id}:`, error?.message);
    return null;
  }

  return data as Perfume;
}
