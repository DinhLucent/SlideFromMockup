import type { StatItem } from "../../content/schema";

export function StatCluster({ items }: { items?: StatItem[] }) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="stat-cluster">
      {items.map((item) => (
        <article className="stat-cluster__item" key={`${item.value}-${item.label}`}>
          <p className="stat-cluster__value">{item.value}</p>
          <p className="stat-cluster__label">{item.label}</p>
          {item.detail ? <p className="stat-cluster__detail">{item.detail}</p> : null}
        </article>
      ))}
    </div>
  );
}
