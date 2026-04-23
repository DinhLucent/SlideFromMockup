import type { ReactNode } from "react";

export function Eyebrow({ children }: { children?: ReactNode }) {
  if (!children) {
    return null;
  }

  return <p className="eyebrow">{children}</p>;
}
