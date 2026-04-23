import type { ReactNode } from "react";
import type { Slide } from "../../content/schema";
import { slideThemeVars } from "../../theme/tokens";

type SlideShellProps = {
  slide: Slide;
  className?: string;
  children: ReactNode;
};

export function renderTitleWithAccents(title: string, accentWords?: string[]) {
  const words = accentWords?.filter(Boolean).slice(0, 2) ?? [];

  if (!words.length) {
    return title;
  }

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const word of words) {
    const index = title.indexOf(word, cursor);

    if (index === -1) {
      continue;
    }

    if (index > cursor) {
      parts.push(title.slice(cursor, index));
    }

    parts.push(
      <span className="accent-word" key={`${word}-${index}`}>
        {word}
      </span>
    );
    cursor = index + word.length;
  }

  if (cursor < title.length) {
    parts.push(title.slice(cursor));
  }

  return parts.length ? parts : title;
}

export function SlideShell({ slide, className, children }: SlideShellProps) {
  return (
    <div
      className="slide-shell"
      data-role={slide.role}
      data-type={slide.type}
      data-theme={slide.theme}
      data-variant={slide.layoutVariant}
      data-motion={slide.motion}
      style={slideThemeVars(slide.theme, slide.footerOpacity)}
    >
      <div className={`slide-shell__content ${className ?? ""}`.trim()}>{children}</div>
      <footer className="slide-shell__footer">
        <span>{slide.eyebrow ?? slide.role}</span>
        <span>{String(slide.slideNumber).padStart(2, "0")}</span>
      </footer>
    </div>
  );
}
