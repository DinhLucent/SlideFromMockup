import {
  createContext,
  type ReactNode,
  useContext
} from "react";

export type RuntimeMode = "preview" | "present" | "export";

const RuntimeModeContext = createContext<RuntimeMode>("preview");

export function readRuntimeMode(): RuntimeMode {
  if (typeof window === "undefined") {
    return "preview";
  }

  const params = new URLSearchParams(window.location.search);
  const mode = params.get("mode");

  if (mode === "present" || mode === "export") {
    return mode;
  }

  if (params.has("export")) {
    return "export";
  }

  return "preview";
}

export function ExportModeProvider({
  children,
  mode
}: {
  children: ReactNode;
  mode: RuntimeMode;
}) {
  return (
    <RuntimeModeContext.Provider value={mode}>
      {children}
    </RuntimeModeContext.Provider>
  );
}

export function useRuntimeMode(): RuntimeMode {
  return useContext(RuntimeModeContext);
}

export function isExportMode(mode: RuntimeMode): boolean {
  return mode === "export";
}

export function isPresentMode(mode: RuntimeMode): boolean {
  return mode === "present" || mode === "export";
}
