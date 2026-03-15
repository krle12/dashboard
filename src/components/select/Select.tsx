import { SelectProps } from "@/src/types";

export function Select({
  label,
  id,
  name,
  options,
  className = "",
  ...props
}: SelectProps) {
  const selectId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={selectId}
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id={selectId}
        name={name}
        className={`w-full border border-gray-300 p-2 rounded-md bg-white focus:ring-2 focus:ring-black outline-none transition-all ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
