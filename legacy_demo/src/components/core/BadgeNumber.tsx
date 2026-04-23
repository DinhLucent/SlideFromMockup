type BadgeNumberProps = {
  value: number | string;
};

export function BadgeNumber({ value }: BadgeNumberProps) {
  return <div className="badge-number">{String(value).padStart(2, "0")}</div>;
}
