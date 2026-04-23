import type { StatItem } from "../../content/schema";

type StatGroupProps = {
  items?: StatItem[];
};

export function StatGroup({ items }: StatGroupProps) {
  if (!items?.length) {
    return null;
  }

  return (
    <div className="stat-group">
      {items.map((item) => (
        <div className="stat-group__item" key={`${item.value}-${item.label}`}>
          <p className="stat-group__value">{item.value}</p>
          <p className="stat-group__label">{item.label}</p>
          {item.detail ? <p className="stat-group__detail">{item.detail}</p> : null}
        </div>
      ))}
    </div>
  );
}

