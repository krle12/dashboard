export function getFileNameFromUrl(url: string | null): string | null {
  if (!url) return null;
  return url.split("/").pop() || null;
}

export async function uploadFileToStorage(
  file: File | null,
  bucketName: string,
  supabase: any,
): Promise<string | null> {
  if (!file || file.size === 0) return null;

  const fileExt = file.name.split(".").pop();
  const fileName = `${Date.now()}-${Math.round(Math.random() * 10000)}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, file);

  if (uploadError) {
    throw new Error(`Error uploading file: ${uploadError.message}`);
  }

  const { data } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return data.publicUrl;
}

export async function deleteFileFromStorage(
  url: string | null,
  bucketName: string,
  supabase: any,
): Promise<void> {
  const fileName = getFileNameFromUrl(url);
  if (!fileName) return;

  await supabase.storage.from(bucketName).remove([fileName]);
}
