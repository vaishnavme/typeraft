import { useEffect, useState, type ReactNode } from "react";
import { getCurrentWindow } from "@tauri-apps/api/window";
import FontToggle from "./font-toggle";
import ThemeToggle from "./theme-toggle";
import store, { storeKeys } from "../../lib/store";
import { useTheme } from "../../theme/theme-provider";
import Button from "../ui/button";
import SidePanel from "./side-panel";
import ToggleFullScreen from "./toggle-fullscreen";
import Settings from "./settings";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  const { setFont, setTheme } = useTheme();
  const [showDrawer, setShowDrawer] = useState<boolean>(false);

  const loadSavedConfig = async () => {
    try {
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
    <div
      id="layout"
      data-tauri-drag-region
      className="relative antialiased p-4 overflow-hidden rounded-2xl"
    >
      <div className="flex items-start geist">
        <main className="w-full">
          {children}
          <footer className="fixed w-full left-0 bottom-0 flex items-center justify-between gap-x-2 px-4 opacity-0 h-12 hover:opacity-100 hover:bg-background transition-all ease-in-out text-accent cursor-default rounded-b-2xl border-b-6 border-x-6 border-border">
            <div className="flex items-center gap-x-2">
              <Settings />•
              <FontToggle />
              •
              <ThemeToggle />
            </div>

            <div className="flex items-center gap-x-2">
              <Button.MonoButton onClick={() => setShowDrawer(true)}>
                ← entries
              </Button.MonoButton>
              <ToggleFullScreen />
              <Button.MonoButton onClick={() => getCurrentWindow().close()}>
                close
              </Button.MonoButton>
            </div>
          </footer>
        </main>
        <SidePanel showDrawer={showDrawer} setShowDrawer={setShowDrawer} />
      </div>
    </div>
  );
};

export default Layout;
