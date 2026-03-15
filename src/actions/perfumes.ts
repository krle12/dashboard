"use server";

import { createClient } from "@/src/database/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ActionState } from "@/src/types";
import { STORAGE_BUCKETS } from "@/src/constants";
import {
  uploadFileToStorage,
  deleteFileFromStorage,
} from "@/src/helpers/storage";
import { requireAuth } from "../helpers/auth";

export async function createPerfume(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();

  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const price = parseInt(formData.get("price") as string);
  const gender = formData.get("gender") as string;
  const description = formData.get("description") as string;
  const image = formData.get("image") as File | null;

  if (!name || !brand || !gender || isNaN(price)) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();
  let image_url = null;

  try {
    image_url = await uploadFileToStorage(
      image,
      STORAGE_BUCKETS.PERFUMES,
      supabase,
    );
  } catch (err: any) {
    return { error: err.message };
  }

  const { error } = await supabase.from("perfumes").insert({
    name,
    brand,
    quantity,
    gender,
    price,
    image_url,
    description: description || null,
  });

  if (error) {
    await deleteFileFromStorage(image_url, STORAGE_BUCKETS.PERFUMES, supabase);
    return { error: `Error inserting perfume: ${error.message}` };
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function updatePerfume(
  prevState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  await requireAuth();

  const id = formData.get("id") as string;
  const name = formData.get("name") as string;
  const brand = formData.get("brand") as string;
  const quantity = parseInt(formData.get("quantity") as string);
  const gender = formData.get("gender") as string;
  const description = formData.get("description") as string;
  const price = parseInt(formData.get("price") as string);

  const image = formData.get("image") as File | null;
  const old_image_url = formData.get("existing_image_url") as string;

  let image_url = old_image_url;
  let isNewImageUploaded = false;

  if (!id || !name || !brand || !gender || isNaN(price)) {
    return { error: "Please fill in all required fields." };
  }

  const supabase = await createClient();

  try {
    const newImageUrl = await uploadFileToStorage(
      image,
      STORAGE_BUCKETS.PERFUMES,
      supabase,
    );
    if (newImageUrl) {
      image_url = newImageUrl;
      isNewImageUploaded = true;
    }
  } catch (err: any) {
    return { error: err.message };
  }

  const { error } = await supabase
    .from("perfumes")
    .update({
      name,
      brand,
      quantity,
      gender,
      price,
      image_url: image_url || null,
      description: description || null,
    })
    .eq("id", id);

  if (error) {
    if (isNewImageUploaded) {
      await deleteFileFromStorage(
        image_url,
        STORAGE_BUCKETS.PERFUMES,
        supabase,
      );
    }
    return { error: `Error updating perfume: ${error.message}` };
  }

  if (isNewImageUploaded && old_image_url) {
    await deleteFileFromStorage(
      old_image_url,
      STORAGE_BUCKETS.PERFUMES,
      supabase,
    );
  }

  revalidatePath("/admin");
  revalidatePath("/");
  redirect("/admin");
}

export async function deletePerfume(id: string) {
  await requireAuth();

  const supabase = await createClient();

  const { data: perfume } = await supabase
    .from("perfumes")
    .select("image_url")
    .eq("id", id)
    .single();

  const { error } = await supabase.from("perfumes").delete().eq("id", id);

  if (!error && perfume?.image_url) {
    await deleteFileFromStorage(
      perfume.image_url,
      STORAGE_BUCKETS.PERFUMES,
      supabase,
    );
  }

  revalidatePath("/admin");
  revalidatePath("/");
}
