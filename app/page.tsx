import { getPerfumes } from "@/src/services/perfumes";
import { PerfumeCard } from "@/src/components/perfume/PerfumeCards";
import { Filters } from "@/src/components/filters/Filters";
import { Pagination } from "@/src/components/pagination/Pagination";
import { PageSearchParams } from "@/src/types";

export default async function PublicPerfumesPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const params = await searchParams;

  const currentPage = Math.max(1, Number(params.page) || 1);
  const currentGender = params.gender === "sve" ? "" : params.gender || "";

  const { perfumes, totalPages } = await getPerfumes({
    page: currentPage,
    gender: currentGender,
    onlyAvailable: true,
  });

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-900 tracking-tight">
        Ponuda parfema
      </h1>

      <Filters currentGender={currentGender} />

      {perfumes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} isAdmin={false} />
            ))}
          </div>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            currentGender={currentGender}
          />
        </>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nema rezultata
          </h3>
          <p className="text-gray-500">Pokušajte sa nekim drugim filterom.</p>
        </div>
      )}
    </main>
  );
}
