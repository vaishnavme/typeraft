import { createContext, useContext, useEffect, useState } from "react";
import store, { storeKeys } from "../lib/store";

export type Theme = "default" | "dark" | "cream" | "mist" | "sage" | "lavender";

export type Font = "geist" | "ibm-plex" | "geist-mono";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  font: Font;
  setFont: (font: Font) => void;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "default",
  font: "geist",
  setFont: () => null,
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const ThemeProvider = (props: ThemeProviderProps) => {
  const { children, ...rest } = props;

  const [appTheme, setAppTheme] = useState<Theme>(store.theme || "default");
  const [appFont, setAppFont] = useState<Font>(store.font || "geist");

  useEffect(() => {
    const root = window.document.documentElement;

    // Remove all possible theme classes
    root.classList.remove(
      "default",
      "dark",
      "cream",
      "mist",
      "sage",
      "lavender",
      "rose"
    );

    // Apply theme (only if not default)
    if (appTheme !== "default") {
      root.classList.add(appTheme);
    }
  }, [appTheme]);

  const setTheme = async (nextTheme: Theme) => {
    setAppTheme(nextTheme);
    await store.setTheme(nextTheme);
  };

  const setFont = async (nextFont: Font) => {
    setAppFont(nextFont);
    await store.setFont(nextFont);
  };

  const loadSavedAppTheme = async () => {
    const [savedTheme, savedFont] = await Promise.all([
      store.getItem(storeKeys.theme),
      store.getItem(storeKeys.font),
    ]);

    setAppTheme(savedTheme || "default");
    setAppFont(savedFont || "geist");
  };

  useEffect(() => {
    loadSavedAppTheme();
  }, []);

  const value = {
    theme: appTheme,
    font: appFont,
    setFont,
    setTheme,
  };

  return (
    <ThemeProviderContext.Provider {...rest} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
