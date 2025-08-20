import React, { useId, useState } from "react";

export interface InputFieldProps {
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: "text" | "password" | "email"; // password support
  clearable?: boolean;
  showPasswordToggle?: boolean;
}

const sizeClasses = {
  sm: "px-2 py-1 text-sm",
  md: "px-3 py-2 text-base",
  lg: "px-4 py-3 text-lg",
};

const variantClasses = {
  filled: "bg-gray-100 border border-gray-300 focus:border-blue-500",
  outlined: "border border-gray-400 focus:border-blue-600",
  ghost: "bg-transparent border-b border-gray-400 focus:border-blue-600",
};

export const InputField: React.FC<InputFieldProps> = ({
  id,
  value,
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled,
  invalid,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  showPasswordToggle = false,
}) => {
  const autoId = useId();
  const inputId = id ?? `input-${autoId}`;
  const helperId = helperText ? `${inputId}-helper` : undefined;
  const errorId = errorMessage ? `${inputId}-error` : undefined;
  const describedBy = [helperId, errorId].filter(Boolean).join(" ") || undefined;

  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";
  const effectiveType = isPassword && showPasswordToggle
    ? (showPassword ? "text" : "password")
    : type;

  return (
    <div className="flex flex-col gap-1 relative">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <div className="relative">
        <input
          id={inputId}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          type={effectiveType}
          className={`
            w-full rounded-md outline-none pr-10
            ${sizeClasses[size]}
            ${variantClasses[variant]}
            ${invalid ? "border-red-500" : ""}
            ${disabled ? "bg-gray-200 cursor-not-allowed" : ""}
          `}
          aria-invalid={invalid || undefined}
          aria-describedby={describedBy}
        />

        {/* Clear Button */}
        {clearable && value && !disabled && (
          <button
            type="button"
            onClick={() =>
              onChange?.({ target: { value: "" } } as React.ChangeEvent<HTMLInputElement>)
            }
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear input"
          >
            ✕
          </button>
        )}

        {/* Password Toggle */}
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>

      {helperText && !errorMessage && (
        <span id={helperId} className="text-xs text-gray-500">
          {helperText}
        </span>
      )}
      {errorMessage && (
        <span id={errorId} className="text-xs text-red-500">
          {errorMessage}
        </span>
      )}
    </div>
  );
};
