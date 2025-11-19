import { TextAreaFieldProps } from "@/props";
import React from "react";

export const TextAreaField: React.FC<TextAreaFieldProps> = ({
  label,
  icon,
  error,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1.5">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>

      {/* Textarea Wrapper */}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3.5 h-5 w-5 text-gray-400 dark:text-gray-500">
            {icon}
          </div>
        )}
        <textarea
          {...props}
          className={`w-full ${icon ? "pl-10" : "pl-3"} p-3 rounded-xl border
                        ${
                          error
                            ? "border-red-400 dark:border-red-500 focus:ring-red-300"
                            : "border-gray-200 dark:border-gray-700 focus:ring-blue-400 focus:border-blue-400"
                        }
                        bg-gray-50 dark:bg-gray-700/80 text-gray-900 dark:text-white
                        focus:ring-2 transition-all min-h-20 resize-none`}
        />
      </div>

      {/* Error Text */}
      {error && (
        <p className="text-xs text-red-500 dark:text-red-400 mt-1 font-medium">
          {error}
        </p>
      )}
    </div>
  );
};
