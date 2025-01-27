export function Heading({title, desc, className, classNameTitle, classNameDesc, as:Tag, style}) {
  return (
    <div className={className} style={style}>
      <Tag className={classNameTitle}>
        {title}
      </Tag>
      <p className={`text-xl-medium text-text ${classNameDesc}`} >
        {desc}
      </p>
    </div>
  );
}
