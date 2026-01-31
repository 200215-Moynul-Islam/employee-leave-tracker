import "./TextField.css";

function TextField({
  label,
  labelStyle,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  maxLength,
  disabled = false,
  leftIcon,
  rightIcon,
  id,
}) {
  return (
    <div className="input-field">
      {label && (
        <label htmlFor={id} className="input-label" style={labelStyle}>
          {label}
        </label>
      )}

      <div className={`input-wrapper ${error ? "input-error" : ""}`}>
        {leftIcon && <span className="input-icon left">{leftIcon}</span>}

        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
        />

        {rightIcon && <span className="input-icon right">{rightIcon}</span>}
      </div>

      {error && <p className="input-error-text">{error}</p>}
    </div>
  );
}

export default TextField;
