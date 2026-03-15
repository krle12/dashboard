import Link from "next/link";
import { FILTER_CATEGORIES } from "@/src/constants";

export function Filters({ currentGender }: { currentGender: string }) {
  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {FILTER_CATEGORIES.map((cat) => (
        <Link
          key={cat.id}
          href={`?gender=${cat.id}&page=1`}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            currentGender === cat.id || (!currentGender && cat.id === "sve")
              ? "bg-black text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </div>
  );
}
