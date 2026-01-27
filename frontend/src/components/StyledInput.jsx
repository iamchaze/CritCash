const StyledInput = ({
  placeholder,
  type = "text",
  name,
  value,
  onChange,
  className = "",
  required = true,
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className={`w-full lg:w-fit p-3 my-2 text-sm text-gray-700 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 ${className}`}
    />
  );
};

export default StyledInput;
