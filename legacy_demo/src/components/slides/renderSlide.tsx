import type { Slide } from "../../content/schema";
import { SlideClosingReference } from "./SlideClosingReference";
import { SlideCover } from "./SlideCover";
import { SlideHook } from "./SlideHook";
import { SlideFramework } from "./SlideFramework";
import { SlideProblemEvidence } from "./SlideProblemEvidence";

type RenderSlideProps = {
  slide: Slide;
};

export function RenderSlide({ slide }: RenderSlideProps) {
  switch (slide.type) {
    case "CoverSlide":
      return <SlideCover slide={slide} />;
    case "HookSlide":
      return <SlideHook slide={slide} />;
    case "ProblemEvidenceSlide":
      return <SlideProblemEvidence slide={slide} />;
    case "FrameworkSlide":
      return <SlideFramework slide={slide} />;
    case "ClosingReferenceSlide":
      return <SlideClosingReference slide={slide} />;
    default:
      return null;
  }
}
