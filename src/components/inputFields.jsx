import * as ImportIcons from "lucide-react";

export const TextInputField = ({
  labelText,
  iconName,
  type,
  name,
  value,
  onChange,
  placeholder,
  errors,
}) => {

  const Icon = ImportIcons[iconName ? iconName : ""];

  return (
    <div class>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {labelText}
      </label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={`pl-10 w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
        />
      </div>
      {errors}
    </div>
  );
};
