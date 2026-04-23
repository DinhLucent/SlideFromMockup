import type { ReactNode } from "react";
import type { Slide } from "../../content/schema";
import { slideDimensions } from "../../theme/tokens";
import type { RuntimeMode } from "../../app/runtime";
import { SlideIndexOverlay } from "./SlideIndexOverlay";

type DeckFrameProps = {
  slide: Slide;
  scale: number;
  mode: RuntimeMode;
  children: ReactNode;
};

export function DeckFrame({ slide, scale, mode, children }: DeckFrameProps) {
  const height = slideDimensions.height * scale;
  const showOverlay = mode === "preview";

  return (
    <section className={`deck-frame deck-frame--${mode}`}>
      <div className="deck-frame__canvas" style={{ height: `${height}px` }}>
        <article
          className="deck-frame__surface"
          data-slide-number={slide.slideNumber}
          data-slide-role={slide.role}
          style={{
            width: `${slideDimensions.width}px`,
            height: `${slideDimensions.height}px`,
            transform: `scale(${scale})`
          }}
        >
          {showOverlay ? <SlideIndexOverlay slide={slide} /> : null}
          {children}
        </article>
      </div>
    </section>
  );
}
