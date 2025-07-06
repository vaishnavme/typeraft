import type { ReactNode } from "react";
import Titlebar from "./titlebar";
import Footer from "./footer";

interface LayoutProps {
  children: ReactNode;
}

const Layout = (props: LayoutProps) => {
  const { children } = props;
  return (
    <div className="bg-background rounded w-full h-[calc(100vh-12px)] relative overflow-hidden">
      <Titlebar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
