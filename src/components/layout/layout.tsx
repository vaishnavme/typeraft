import type { ReactNode } from "react";
import FontToggle from "./font-toggle";
import ThemeToggle from "./theme-toggle";
import SidePanel from "./side-panel";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

  return (
    <div className="w-full min-h-screen relative antialiased geist">
      {children}
      <footer className="flex items-center gap-x-1 p-1 fixed bottom-0 right-0">
        <FontToggle />
        <ThemeToggle />
        <SidePanel />
      </footer>
    </div>
  );
};

export default Layout;
