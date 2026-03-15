import { createClient } from "@/src/database/server";

export async function requireAuth() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized access! You must be logged in.");
  }

  return user;
}
