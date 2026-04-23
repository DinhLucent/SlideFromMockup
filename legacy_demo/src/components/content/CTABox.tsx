export function CTABox({ children }: { children?: string | null }) {
  if (!children) {
    return null;
  }

  return <p className="cta-box">{children}</p>;
}
