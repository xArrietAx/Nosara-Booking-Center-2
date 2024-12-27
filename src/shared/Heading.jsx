export function Heading({title, desc, className, classNameTitle, classNameDesc, as:Tag}) {
  return (
    <div className={className}>
      <Tag className={classNameTitle}>
        {title}
      </Tag>
      <p className={`text-xl-medium text-text ${classNameDesc}`} >
        {desc}
      </p>
    </div>
  );
}
