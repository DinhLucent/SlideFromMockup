export function BodyCopy({
  children,
  className
}: {
  children?: string | null;
  className?: string;
}) {
  if (!children) {
    return null;
  }

  return <p className={`body-copy ${className ?? ""}`.trim()}>{children}</p>;
}
