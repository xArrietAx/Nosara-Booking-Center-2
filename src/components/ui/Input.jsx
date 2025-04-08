export function Input({
    value,
    setValue,
    className,
    type = "text",
    placeholder,
    required,
    iconClassName,
    classNameWrapper,
    ...props
  }) {
    return (
      <div className={classNameWrapper}>
        <i className={iconClassName}/>
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className={`${className} w-full outline-hidden`}
          required={required}
          {...props}
        />
      </div>
    );
  }  