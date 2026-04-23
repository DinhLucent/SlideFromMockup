import { startTransition, useEffect, useState } from "react";
import { DeckFrame } from "../components/core/DeckFrame";
import { RenderSlide } from "../components/slides/renderSlide";
import { loadDeck } from "../content/loadDeck";
import {
  ExportModeProvider,
  isExportMode,
  readRuntimeMode
} from "./runtime";
import { ThemeProvider } from "./ThemeProvider";

const { manifest, deck } = loadDeck();

function readViewportWidth(): number {
  if (typeof window === "undefined") {
    return 1600;
  }

  return window.innerWidth;
}

function useSlideScale(fixedViewport: boolean) {
  const [viewportWidth, setViewportWidth] = useState(readViewportWidth);

  useEffect(() => {
    if (fixedViewport) {
      return;
    }

    const onResize = () => {
      startTransition(() => {
        setViewportWidth(readViewportWidth());
      });
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, [fixedViewport]);

  if (fixedViewport) {
    return 1;
  }

  const horizontalPadding = viewportWidth < 768 ? 20 : 88;
  const rawScale = (viewportWidth - horizontalPadding) / 1600;

  return Number(Math.min(1, Math.max(0.38, rawScale)).toFixed(4));
}

export function App() {
  const mode = readRuntimeMode();
  const exportMode = isExportMode(mode);
  const scale = useSlideScale(exportMode);
  const frameworkSlides = deck.slides.filter((slide) => slide.type === "FrameworkSlide").length;

  return (
    <ExportModeProvider mode={mode}>
      <ThemeProvider mode={mode}>
        {mode === "preview" ? (
          <header className="studio-header">
            <div className="studio-header__copy">
              <p className="studio-header__eyebrow">{manifest.theme}</p>
              <h1>{deck.meta.title}</h1>
              <p>{manifest.subtitle}</p>
            </div>

            <div className="studio-header__meta">
              <span>{deck.slides.length} slides</span>
              <span>{frameworkSlides} framework slides</span>
              <span>HTML-first</span>
              <span>manifest + tokens + assets</span>
            </div>
          </header>
        ) : null}

        <main className="deck-list">
          {deck.slides.map((slide) => (
            <DeckFrame key={slide.id} mode={mode} scale={scale} slide={slide}>
              <RenderSlide slide={slide} />
            </DeckFrame>
          ))}
        </main>
      </ThemeProvider>
    </ExportModeProvider>
  );
}
