import { TextAreaProps } from "@/src/types";

export function TextArea({
  label,
  id,
  name,
  className = "",
  ...props
}: TextAreaProps) {
  const textAreaId = id || name;

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={textAreaId}
          className="block text-sm font-medium mb-1 text-gray-700"
        >
          {label}
        </label>
      )}
      <textarea
        id={textAreaId}
        name={name}
        className={`w-full border border-gray-300 p-2 rounded-md focus:ring-2 focus:ring-black outline-none transition-all ${className}`}
        {...props}
      />
    </div>
  );
}
