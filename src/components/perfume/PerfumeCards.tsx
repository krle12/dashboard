"use client";

import Link from "next/link";
import Image from "next/image";
import { deletePerfume } from "@/src/actions/perfumes";
import { Perfume } from "@/src/types";

export function PerfumeCard({
  perfume,
  isAdmin = false,
}: {
  perfume: Perfume;
  isAdmin?: boolean;
}) {
  const deletePerfumeWithId = deletePerfume.bind(null, perfume.id);

  const handleDeleteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (
      !window.confirm("Da li ste sigurni da želite da obrišete ovaj parfem?")
    ) {
      e.preventDefault();
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow flex flex-col overflow-hidden group h-full">
      <div className="relative w-full h-64 bg-gray-50 border-b border-gray-100 flex items-center justify-center overflow-hidden">
        {perfume.image_url ? (
          <Image
            src={perfume.image_url}
            alt={perfume.name}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          />
        ) : (
          <span className="text-gray-400 text-sm font-medium">Nema slike</span>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex justify-between items-center mb-1.5 gap-2">
            <span className="text-gray-500 text-sm font-medium truncate">
              {perfume.brand}
            </span>
            <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-600 uppercase tracking-wide shrink-0">
              {perfume.gender}
            </span>
          </div>

          <h3 className="font-bold text-lg text-gray-900 leading-tight mb-2">
            {perfume.name}
          </h3>

          <div className="text-xl font-extrabold text-black mb-4">
            {perfume.price} KM
          </div>

          <div className="mb-6 flex items-center gap-2">
            <span className="text-sm text-gray-600">Na stanju:</span>
            <span
              className={`font-semibold px-2 py-0.5 rounded text-sm ${
                perfume.quantity > 0
                  ? "bg-green-50 text-green-700"
                  : "bg-red-50 text-red-700"
              }`}
            >
              {perfume.quantity} kom
            </span>
          </div>
        </div>

        {isAdmin && (
          <div className="flex gap-3 mt-auto pt-4 border-t border-gray-100">
            <Link
              href={`/admin/perfumes/${perfume.id}/edit`}
              className="flex-1 text-center bg-gray-50 hover:bg-gray-100 text-gray-700 border border-gray-200 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Izmeni
            </Link>

            <form action={deletePerfumeWithId} className="flex-1">
              <button
                type="submit"
                onClick={handleDeleteClick}
                className="w-full text-center bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Obriši
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
