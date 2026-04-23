import type { Slide } from "../../content/schema";
import { renderTitleWithAccents } from "../core/SlideShell";

export function Headline({
  slide,
  className
}: {
  slide: Slide;
  className?: string;
}) {
  return (
    <h1 className={`headline ${className ?? ""}`.trim()}>
      {renderTitleWithAccents(slide.title, slide.accentWords)}
    </h1>
  );
}
