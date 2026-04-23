import type { Slide } from "../../content/schema";
import { BodyCopy } from "../content/BodyCopy";
import { BulletList } from "../content/BulletList";
import { CTABox } from "../content/CTABox";
import { Eyebrow } from "../content/Eyebrow";
import { Headline } from "../content/Headline";
import { StatCluster } from "../content/StatCluster";
import { BadgeNumber } from "../core/BadgeNumber";
import { IllustrationSlot } from "../media/IllustrationSlot";
import { SlideShell } from "../core/SlideShell";

export function SlideFramework({ slide }: { slide: Slide }) {
  const isStatBoard = Boolean(slide.statItems?.length);
  const hasBadge = Boolean(slide.badgeNumber);

  if (isStatBoard) {
    return (
      <SlideShell slide={slide} className="slide-layout slide-layout--framework-board">
        <div className="content-stack content-stack--wide">
          <Eyebrow>{slide.eyebrow}</Eyebrow>
          <Headline className="headline--framework" slide={slide} />
          <BodyCopy>{slide.body}</BodyCopy>
          <StatCluster items={slide.statItems} />
        </div>

        <IllustrationSlot slide={slide} variant="poster" />
      </SlideShell>
    );
  }

  return (
    <SlideShell slide={slide} className="slide-layout slide-layout--framework-card">
      <div className="content-stack">
        <Eyebrow>{slide.eyebrow}</Eyebrow>
        {hasBadge ? <BadgeNumber value={slide.badgeNumber ?? ""} /> : null}
        <Headline className="headline--framework" slide={slide} />
        <BodyCopy>{slide.body}</BodyCopy>
        <BulletList items={slide.bullets} />
        <CTABox>{slide.callout}</CTABox>
      </div>

      <IllustrationSlot slide={slide} variant="poster" />
    </SlideShell>
  );
}
