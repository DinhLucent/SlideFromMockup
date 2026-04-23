export function BulletList({
  items,
  className
}: {
  items?: string[];
  className?: string;
}) {
  if (!items?.length) {
    return null;
  }

  return (
    <ul className={`bullet-list ${className ?? ""}`.trim()}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
