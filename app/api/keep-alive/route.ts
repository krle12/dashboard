import { NextResponse } from "next/server";
import { createClient } from "@/src/database/server";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const supabase = await createClient();

    const { count, error } = await supabase
      .from("perfumes")
      .select("*", { count: "exact", head: true });

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: "Database is awake!",
      count,
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    console.error("Keep-alive error:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 },
    );
  }
}
