import { getPerfumeById } from "@/src/services/perfumes";
import { updatePerfume } from "@/src/actions/perfumes";
import { PerfumeForm } from "@/src/components/perfume/PerfumeForm";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function EditPerfumePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const perfume = await getPerfumeById(id);

  if (!perfume) redirect("/admin");

  return (
    <main className="p-8 max-w-3xl mx-auto min-h-screen">
      <div className="mb-8">
        <Link
          href="/admin"
          className="text-gray-500 hover:text-gray-900 flex items-center gap-2 transition-colors w-fit"
        >
          <span>←</span> Nazad na listu
        </Link>
      </div>

      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900">
          Izmena parfema
        </h1>
        <p className="text-gray-500 mt-2">
          Menjate podatke za:{" "}
          <span className="font-semibold text-black">{perfume.name}</span>
        </p>
      </div>
      <PerfumeForm action={updatePerfume} initialData={perfume} />
    </main>
  );
}
