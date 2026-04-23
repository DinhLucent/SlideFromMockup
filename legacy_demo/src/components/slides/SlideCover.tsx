import type { Slide } from "../../content/schema";
import { BodyCopy } from "../content/BodyCopy";
import { Eyebrow } from "../content/Eyebrow";
import { Headline } from "../content/Headline";
import { IllustrationSlot } from "../media/IllustrationSlot";
import { SlideShell } from "../core/SlideShell";

export function SlideCover({ slide }: { slide: Slide }) {
  return (
    <SlideShell slide={slide} className="slide-layout slide-layout--cover">
      <div className="content-stack content-stack--cover">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        <Headline className="headline--cover" slide={slide} />
        <BodyCopy className="body-copy--subheadline">{slide.subheadline}</BodyCopy>
        <BodyCopy className="body-copy--lead">{slide.body}</BodyCopy>
      </div>

      <IllustrationSlot slide={slide} variant="hero" />
    </SlideShell>
  );
}
