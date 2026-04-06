import React, { createContext, useContext, ReactNode } from "react";
import { Theme } from "../types";
import { THEMES } from "../themes";
import { useAppState } from "./AppStateContext";

const ThemeCtx = createContext<Theme>(THEMES.mostWanted);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { themeId } = useAppState();
  const theme = THEMES[themeId] || THEMES.mostWanted;

  return <ThemeCtx.Provider value={theme}>{children}</ThemeCtx.Provider>;
}

export function useTheme(): Theme {
  return useContext(ThemeCtx);
}
