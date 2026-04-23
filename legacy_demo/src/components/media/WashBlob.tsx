export function WashBlob({
  className
}: {
  className: string;
}) {
  return <span aria-hidden="true" className={`wash-blob ${className}`.trim()} />;
}
