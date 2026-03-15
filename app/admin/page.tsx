import { logout } from "@/src/actions/auth";
import { Filters } from "@/src/components/filters/Filters";
import { Pagination } from "@/src/components/pagination/Pagination";
import { PerfumeCard } from "@/src/components/perfume/PerfumeCards";
import { requireAuth } from "@/src/helpers/auth";
import { getPerfumes } from "@/src/services/perfumes";
import { PageSearchParams } from "@/src/types";
import Link from "next/link";

export default async function AdminPage({
  searchParams,
}: {
  searchParams: PageSearchParams;
}) {
  const user = await requireAuth();

  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const currentGender = params.gender === "sve" ? "" : params.gender || "";

  const { perfumes, totalPages } = await getPerfumes({
    page: currentPage,
    gender: currentGender,
  });

  return (
    <main className="p-8 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center mb-10 border-b border-gray-200 pb-6 gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-900">Admin Panel</h1>
          <p className="mt-2 text-gray-500">
            Upravljanje inventarom. Ulogovani ste kao{" "}
            <span className="text-gray-900 font-medium">{user.email}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/perfumes/new"
            className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-l-lg font-medium transition-colors shadow-sm flex items-center gap-2"
          >
            <span className="text-lg leading-none">+</span> Dodaj novi parfem
          </Link>

          <form action={logout}>
            <button
              type="submit"
              className="w-full text-center bg-red-50 hover:bg-red-100 text-red-600 px-6 py-3 rounded-r-lg font-medium transition-colors shadow-sm"
            >
              Odjavi se
            </button>
          </form>
        </div>
      </div>

      <Filters currentGender={currentGender} />

      {perfumes.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {perfumes.map((perfume) => (
              <PerfumeCard key={perfume.id} perfume={perfume} isAdmin={true} />
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
            Nema dodatih parfema
          </h3>
          <p className="text-gray-500 mb-6">
            Promenite filter ili dodajte novi parfem.
          </p>
        </div>
      )}
    </main>
  );
}
