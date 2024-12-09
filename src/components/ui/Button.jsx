import classNames from 'classnames';

export function Button({ 
  children, 
  className, 
  color = 'primary', 
  size = 'md', 
  isIconOnly = false, 
  variant = 'default',
  as = "button",
  ...props 
}) {

  const Tag = as

  const baseClass = "inline-flex items-center justify-center gap-2 rounded-full transition duration-300";

  const colorClasses = {
    primary: "bg-primary text-white",
    secondary: "bg-secondary",
  };

  const variantClasses = {
    ghost: "!bg-transparent !text-black hover:!bg-secondary",
    outline: "border border-primary !text-black bg-transparent hover:!text-white hover:bg-primary",
  };

  const sizeClasses = {
    sm: isIconOnly ? "w-8 h-8" : "h-8 px-3 py-1.5 text-sm",
    md: isIconOnly ? "w-10 h-10" : "h-10 px-5 py-2.5 text-base",
    lg: isIconOnly ? "w-12 h-12" : "h-12 px-6 py-3 text-lg",
  };

  const buttonClass = classNames(
    baseClass,
    sizeClasses[size],
    colorClasses[color],
    variantClasses[variant],
    className
  );

  return (
    <Tag className={buttonClass} {...props}>
      {children}
    </Tag>
  );
}