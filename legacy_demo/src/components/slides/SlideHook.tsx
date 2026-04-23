import type { Slide } from "../../content/schema";
import { BodyCopy } from "../content/BodyCopy";
import { Eyebrow } from "../content/Eyebrow";
import { Headline } from "../content/Headline";
import { QuoteBox } from "../content/QuoteBox";
import { IllustrationSlot } from "../media/IllustrationSlot";
import { SlideShell } from "../core/SlideShell";

export function SlideHook({ slide }: { slide: Slide }) {
  return (
    <SlideShell slide={slide} className="slide-layout slide-layout--hook">
      <div className="content-stack content-stack--hook">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Headline className="headline--hook" slide={slide} />
        <QuoteBox>{slide.quote}</QuoteBox>
        <BodyCopy>{slide.body}</BodyCopy>
      </div>

      <IllustrationSlot slide={slide} variant="hero" />
    </SlideShell>
  );
}
