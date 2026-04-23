import type { Slide } from "../../content/schema";

export function SlideIndexOverlay({ slide }: { slide: Slide }) {
  const characterDirection = slide.characterDirection;
  const cast = characterDirection?.characters.length
    ? characterDirection.characters
    : ["symbolic-only"];

  return (
    <div className="slide-index-overlay" aria-hidden="true">
      <span className="slide-index-overlay__index">{String(slide.slideNumber).padStart(2, "0")}</span>
      <small className="slide-index-overlay__type">{slide.type}</small>

      {characterDirection ? (
        <div className="slide-index-overlay__details">
          <div className="slide-index-overlay__row">
            <small className="slide-index-overlay__label">scene</small>
            <small className="slide-index-overlay__value">{characterDirection.sceneId}</small>
          </div>

          <div className="slide-index-overlay__row">
            <small className="slide-index-overlay__label">cast</small>
            <div className="slide-index-overlay__tags">
              {cast.map((item) => (
                <small className="slide-index-overlay__tag" key={item}>
                  {item}
                </small>
              ))}
            </div>
          </div>

          <div className="slide-index-overlay__row">
            <small className="slide-index-overlay__label">action</small>
            <small className="slide-index-overlay__value">{characterDirection.actionId}</small>
          </div>
        </div>
      ) : null}
    </div>
  );
}
