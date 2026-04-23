import type { CSSProperties } from "react";
import type { Slide } from "../../content/schema";
import { ImageFrame } from "./ImageFrame";

export function IllustrationSlot({
  slide,
  variant = "default"
}: {
  slide: Slide;
  variant?: "default" | "hero" | "poster" | "banner";
}) {
  const { illustration } = slide;
  const characterDirection = slide.characterDirection;

  return (
    <div
      className={`illustration-slot illustration-slot--${variant}`}
      data-action-id={characterDirection?.actionId}
      data-anchor={illustration.anchor}
      data-character-ids={characterDirection?.characters.join(",") || undefined}
      data-crop-safe={illustration.cropSafe ? "true" : "false"}
      data-focal-point={illustration.focalPoint}
      data-motion={illustration.motion}
      data-pose-id={characterDirection?.poseId}
      data-scene-id={characterDirection?.sceneId}
      data-shadow={illustration.shadow}
      data-type={illustration.type}
      data-wash={illustration.wash}
      style={
        {
          "--illustration-scale": String(illustration.scale ?? 1),
          "--illustration-z-index": String(illustration.zIndex ?? 1)
        } as CSSProperties
      }
    >
      {illustration.wash !== "none" ? (
        <span aria-hidden="true" className="illustration-slot__wash" />
      ) : null}

      <div className="illustration-slot__media">
        <div className="illustration-slot__media-inner">
          <ImageFrame
            fallbackLabel={slide.illustrationSubject}
            illustration={illustration}
          />
        </div>
      </div>
    </div>
  );
}
