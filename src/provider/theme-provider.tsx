import { createContext, useContext, useEffect, useState } from "react";

export type Theme = "default" | "dark" | "cream" | "mist" | "sage" | "lavender";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: "default",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const ThemeProvider = (props: ThemeProviderProps) => {
  const {
    children,
    defaultTheme = "default",
    storageKey = "vite-ui-theme",
    ...rest
  } = props;

  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

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
    if (theme !== "default") {
      root.classList.add(theme);
    }
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...rest} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
