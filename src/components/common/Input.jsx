const Input = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  maxLength,
  minLength,
}) => {
  return (
    <>
      <div className="from-control">
        {icon}
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          maxLength={maxLength}
          minLength={minLength}
          required
        />
        <p className="error-mes">{error}</p>
      </div>
    </>
  );
};

export default Input;
