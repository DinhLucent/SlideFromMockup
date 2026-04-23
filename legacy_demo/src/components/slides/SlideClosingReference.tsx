import type { Slide } from "../../content/schema";
import { BodyCopy } from "../content/BodyCopy";
import { BulletList } from "../content/BulletList";
import { CTABox } from "../content/CTABox";
import { Eyebrow } from "../content/Eyebrow";
import { Headline } from "../content/Headline";
import { CitationBlock } from "../core/CitationBlock";
import { IllustrationSlot } from "../media/IllustrationSlot";
import { SlideShell } from "../core/SlideShell";

export function SlideClosingReference({ slide }: { slide: Slide }) {
  const isReference = Boolean(slide.citation?.length);
  const variant = slide.layoutVariant === "closing-thank-you-banner" ? "banner" : "poster";

  return (
    <SlideShell
      slide={slide}
      className={`slide-layout ${isReference ? "slide-layout--reference" : "slide-layout--closing"}`}
    >
      <div className={`content-stack ${isReference ? "content-stack--reference" : "content-stack--closing"}`}>
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Headline className={isReference ? "" : "headline--closing"} slide={slide} />
        <BodyCopy>{slide.body}</BodyCopy>
        <BulletList items={slide.bullets} className={isReference ? "bullet-list--tight" : ""} />
        <CTABox>{slide.callout}</CTABox>
        <CitationBlock citation={slide.citation} />
      </div>

      <IllustrationSlot slide={slide} variant={variant} />
    </SlideShell>
  );
}
