import type { Slide } from "../../content/schema";
import { BodyCopy } from "../content/BodyCopy";
import { BulletList } from "../content/BulletList";
import { CTABox } from "../content/CTABox";
import { Eyebrow } from "../content/Eyebrow";
import { Headline } from "../content/Headline";
import { CitationBlock } from "../core/CitationBlock";
import { IllustrationSlot } from "../media/IllustrationSlot";
import { SlideShell } from "../core/SlideShell";

export function SlideProblemEvidence({ slide }: { slide: Slide }) {
  return (
    <SlideShell slide={slide} className="slide-layout slide-layout--problem">
      <div className="content-stack">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Headline slide={slide} />
        <BodyCopy>{slide.body}</BodyCopy>
        <BulletList items={slide.bullets} />
        <CTABox>{slide.callout}</CTABox>
        <CitationBlock citation={slide.citation} />
      </div>

      <IllustrationSlot slide={slide} />
    </SlideShell>
  );
}
