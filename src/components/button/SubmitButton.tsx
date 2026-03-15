"use client";

import { useFormStatus } from "react-dom";

export function SubmitButton({
  defaultText,
  loadingText,
}: {
  defaultText: string;
  loadingText: string;
}) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className={`w-full text-white p-2.5 rounded-md font-medium transition-colors ${
        pending
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-black hover:bg-gray-800"
      }`}
    >
      {pending ? loadingText : defaultText}
    </button>
  );
}
