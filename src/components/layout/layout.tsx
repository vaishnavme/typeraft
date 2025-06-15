import { useEffect, type ReactNode } from "react";
import FontToggle from "./font-toggle";
import ThemeToggle from "./theme-toggle";
import store, { storeKeys } from "../../lib/store";
import { useTheme } from "../../theme/theme-provider";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const { setFont, setTheme } = useTheme();

  const loadSavedConfig = async () => {
    try {
      await store.init();
      const [configTheme, configFont] = await Promise.all([
        store.getItem(storeKeys.theme),
        store.getItem(storeKeys.font),
      ]);
      if (configFont) setFont(configFont);
      if (configTheme) setTheme(configTheme);
    } catch {
      //
    }
  };

  useEffect(() => {
    loadSavedConfig();
  }, []);

  return (
    <div className="w-full min-h-screen relative antialiased geist">
      {children}
      <footer className="fixed w-full left-0 bottom-0 flex items-center gap-x-2 px-4 opacity-0 h-12 hover:opacity-100 hover:bg-background transition-all ease-in-out text-accent cursor-default">
        <FontToggle />
        •
        <ThemeToggle />
      </footer>
    </div>
  );
};

export default Layout;
