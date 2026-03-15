import { PerfumeForm } from "@/src/components/perfume/PerfumeForm";
import { createPerfume } from "@/src/actions/perfumes";
import Link from "next/link";

export default function NewPerfumePage() {
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
          Unos novog parfema
        </h1>
        <p className="text-gray-500 mt-2">
          Popunite detalje ispod kako biste dodali parfem u inventar.
        </p>
      </div>
      <PerfumeForm action={createPerfume} />
    </main>
  );
}
