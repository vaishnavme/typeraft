import type { ReactNode } from "react";
import Header from "./header";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="font-geist bg-background rounded w-full h-[calc(100vh-12px)] relative overflow-y-auto antialiased">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
