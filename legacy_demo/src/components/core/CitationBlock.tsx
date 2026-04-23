import type { Citation } from "../../content/schema";

type CitationBlockProps = {
  citation?: Citation[];
};

export function CitationBlock({ citation }: CitationBlockProps) {
  if (!citation?.length) {
    return null;
  }

  return (
    <div className="citation-block" aria-label="Sources">
      {citation.map((item) => (
        <p className="citation-block__item" key={item.source}>
          <strong>{item.source}</strong>
          {item.note ? <span>{item.note}</span> : null}
        </p>
      ))}
    </div>
  );
}

