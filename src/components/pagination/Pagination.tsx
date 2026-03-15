import Link from "next/link";

export function Pagination({
  currentPage,
  totalPages,
  currentGender,
}: {
  currentPage: number;
  totalPages: number;
  currentGender: string;
}) {
  if (totalPages <= 1) return null;

  const genderParam = currentGender ? `&gender=${currentGender}` : "";

  return (
    <div className="flex justify-center items-center gap-4 mt-12 mb-8">
      {currentPage > 1 ? (
        <Link
          href={`?page=${currentPage - 1}${genderParam}`}
          className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          Prethodna
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-md bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed">
          Prethodna
        </span>
      )}

      <span className="text-sm font-medium text-gray-600">
        Strana {currentPage} od {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={`?page=${currentPage + 1}${genderParam}`}
          className="px-4 py-2 border rounded-md bg-white hover:bg-gray-50 text-sm font-medium transition-colors"
        >
          Sledeća
        </Link>
      ) : (
        <span className="px-4 py-2 border rounded-md bg-gray-50 text-gray-400 text-sm font-medium cursor-not-allowed">
          Sledeća
        </span>
      )}
    </div>
  );
}
