import { createContext, useContext, useState, type ReactNode } from "react";

export type Theme =
  | "paper"
  | "cream"
  | "mist"
  | "sage"
  | "lavender"
  | "rose"
  | "ink";

interface ThemeProviderProps {
  children: ReactNode;
}

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "paper",
  setTheme: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  return context;
};

export const ThemeProvider = (props: ThemeProviderProps) => {
  const { children } = props;

  const [appTheme, setAppTheme] = useState<Theme>("paper");

  const setTheme = (nextTheme: Theme) => {
    const root = document.documentElement;
    root.className = "";
    root.classList.add(nextTheme);
    setAppTheme(nextTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme: appTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
