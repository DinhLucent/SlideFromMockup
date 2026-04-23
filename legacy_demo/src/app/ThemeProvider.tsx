import type { ReactNode } from "react";
import type { RuntimeMode } from "./runtime";
import { themeVars } from "../theme/tokens";

export function ThemeProvider({
  children,
  mode
}: {
  children: ReactNode;
  mode: RuntimeMode;
}) {
  return (
    <div className="app-shell" data-mode={mode} style={themeVars()}>
      {children}
    </div>
  );
}
