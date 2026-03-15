"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Error catch:", error);
  }, [error]);

  return (
    <main className="flex min-h-[70vh] flex-col items-center justify-center p-8">
      <div className="bg-red-50 p-8 rounded-2xl shadow-sm border border-red-100 text-center max-w-md w-full">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚠️</span>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-red-900">
          Uf, došlo je do greške!
        </h2>
        <p className="text-red-700 mb-8 text-sm leading-relaxed">
          {error.message ||
            "Izgleda da imate problema sa internet konekcijom ili je server trenutno preopterećen."}
        </p>
        <button
          onClick={() => reset()}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors w-full shadow-sm"
        >
          Pokušaj ponovo
        </button>
      </div>
    </main>
  );
}
