import { useEffect, useState } from "react";
import type { Illustration } from "../../content/schema";

export function ImageFrame({
  illustration,
  fallbackLabel
}: {
  illustration: Illustration;
  fallbackLabel: string;
}) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [illustration.src]);

  if (!illustration.src || hasError) {
    return (
      <div className="image-frame image-frame--placeholder" aria-hidden="true">
        <span>{fallbackLabel}</span>
      </div>
    );
  }

  return (
    <img
      alt={illustration.alt ?? fallbackLabel}
      className="image-frame"
      decoding="async"
      loading="eager"
      onError={() => setHasError(true)}
      src={illustration.src}
    />
  );
}
