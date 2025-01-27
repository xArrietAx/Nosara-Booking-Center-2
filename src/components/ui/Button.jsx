import classNames from "classnames";

export function Button({
  children,
  className,
  hover,
  size = "md",
  isIconOnly = false,
  variant = "primary",
  as = "button",
  radius = "full",
  loading,
  ...props
}) {
  const Tag = as;

  const buttonClass = classNames(
    "inline-flex items-center justify-center gap-2 border-border font-bold transition-all duration-300",
    {
      "rounded-full": radius === "full",
      "rounded": radius === "smooth",
      "rounded-none": radius === "none",

      "text-white bg-primary": variant === "primary",
      "bg-secondary": variant === "secondary",
      "border  hover:text-white hover:bg-primary": variant === "outline",
      "bg-transparent hover:bg-secondary": variant === "ghost",

      

      "hover:!text-white hover:!bg-primary": hover === "primary",
      "hover:!text-black hover:!bg-secondary": hover === "secondary",
      "border hover:!text-black hover:!bg-transparent": hover === "outline",
      "border-0 hover:border hover:!text-black hover:!bg-transparent": hover === "outline" && variant === "ghost",
      "hover:!border-0 hover:!text-black hover:!bg-transparent": hover === "ghost",

      "px-3 py-[0.4375rem] text-xs": size === "xs",
      "px-[1.125rem] py-2 text-sm": size === "sm",
      "px-[1.375rem] py-3": size === "md" && !isIconOnly,
      "px-[1.625rem] py-4": size === "lg",
    
      "w-8 h-8": isIconOnly === "sm",
      "w-10 h-10": isIconOnly,
      "w-12 h-12": isIconOnly === "lg",
    },
    className
  );

  return (
      <Tag className={buttonClass} disabled={loading} {...props}>
        {loading ? <Loading /> : children}
      </Tag>
  );
}

function Loading() {
  return <div className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent rounded-full" role="status" aria-label="loading">
  <span className="sr-only">Loading...</span>
</div>
}