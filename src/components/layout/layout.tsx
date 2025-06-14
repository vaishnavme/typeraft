import type { ReactNode } from "react";
import FontToggle from "./font-toggle";
import ThemeToggle from "./theme-toggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;

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
