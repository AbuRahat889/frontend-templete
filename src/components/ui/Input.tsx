// components/FormInput.tsx
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";
import { InputHTMLAttributes, useState } from "react";
import {
  FieldValues,
  Path,
  RegisterOptions,
  useFormContext,
} from "react-hook-form";

interface FormInputProps<
  T extends FieldValues,
> extends InputHTMLAttributes<HTMLInputElement> {
  name: Path<T>;
  label?: string;
  className?: string;
  type?: "text" | "email" | "password" | "number";
  rules?: RegisterOptions; // 👈 Added this to accept custom validation rules
}

export function FormInput<T extends FieldValues>({
  name,
  className,
  label,
  type = "text",
  rules,
  ...rest
}: FormInputProps<T>) {
  const {
    register,
    formState: { errors },
  } = useFormContext<T>();

  const error = errors[name]?.message as string | undefined;

  const [isEyeOpen, setIsEyeOpen] = useState(false);
  const isPasswordField = type === "password";

  return (
    <div className="mb-2 w-full space-y-2">
      {label && (
        <label
          htmlFor={name}
          className="text-base font-normal mb-3 text-textColor"
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex items-center gap-3 w-full px-6 py-3 bg-white rounded-lg border",
          error ? "border-red-500" : "border-gray-200",
          className,
        )}
      >
        <div className="relative w-full">
          {isPasswordField && (
            <button
              type="button"
              onClick={() => setIsEyeOpen(!isEyeOpen)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            >
              {isEyeOpen ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}

          <input
            id={name}
            type={isPasswordField ? (isEyeOpen ? "text" : "password") : type}
            {...register(name, {
              required: `${label || name} is required`,
              ...(type === "number" ? { valueAsNumber: true } : {}),
              ...(rules as RegisterOptions<any, any>),
            } as RegisterOptions<T, Path<T>>)}
            {...rest}
            className={cn(
              "w-full text-[#747474] text-base font-medium outline-none pr-10 bg-transparent",
              error && "text-red-500 placeholder:text-red-400",
            )}
          />
        </div>
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
