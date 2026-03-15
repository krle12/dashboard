import { InputProps } from "@/src/types";

export function Input({
  label,
  id,
  name,
  className = "",
  ...props
}: InputProps) {
  const inputId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        name={name}
        className={`w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-black outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
