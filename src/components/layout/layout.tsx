import { useEffect, useState, type ReactNode } from "react";
import FontToggle from "./font-toggle";
import ThemeToggle from "./theme-toggle";
import store, { storeKeys } from "../../lib/store";
import { useTheme } from "../../theme/theme-provider";
import Button from "../ui/button";
import SidePanel from "./side-panel";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const { setFont, setTheme } = useTheme();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

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
    <div className="relative antialiased geist w-full min-h-screen flex items-start">
      <main className="w-full">
        {children}
        <footer className="fixed w-full left-0 bottom-0 flex items-center justify-between gap-x-2 px-4 opacity-0 h-12 hover:opacity-100 hover:bg-background transition-all ease-in-out text-accent cursor-default">
          <div className="flex items-center gap-x-2">
            <FontToggle />
            •
            <ThemeToggle />
          </div>

          <Button.MonoButton onClick={() => setShowDrawer(true)}>
            ← Open
          </Button.MonoButton>
        </footer>
      </main>

      <SidePanel showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
    </div>
  );
};

export default Layout;
