export function QuoteBox({ children }: { children?: string | null }) {
  if (!children) {
    return null;
  }

  return (
    <blockquote className="quote-box">
      <p>{children}</p>
    </blockquote>
  );
}
