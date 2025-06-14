import { createContext, useContext, useState, type ReactNode } from "react";

export type Theme =
  | "paper"
  | "cream"
  | "mist"
  | "sage"
  | "lavender"
  | "rose"
  | "ink";

export type Font = "geist" | "ibm-plex" | "jetbrains-mono";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  font: Font;
  setFont: (font: Font) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  font: "geist",
  theme: "paper",
  setFont: () => {},
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  const [appFont, setAppFont] = useState<Font>("geist");
  const [appTheme, setAppTheme] = useState<Theme>("paper");

  const setTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    root.classList.remove(
      "paper",
      "cream",
      "mist",
      "sage",
      "lavender",
      "rose",
      "ink"
    );
    root.classList.add(nextTheme);
    setAppTheme(nextTheme);
  };

  const setFont = (nextFont: Font) => {
    setAppFont(nextFont);
  };

  return (
    <ThemeContext.Provider
      value={{ font: appFont, theme: appTheme, setFont, setTheme }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
