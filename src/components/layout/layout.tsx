import type { ReactNode } from "react";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="font-geist bg-background rounded w-full relative antialiased">
      <Header />
      <main className="w-full h-[calc(100vh-44px)] overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default Layout;
