import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <main className="mx-auto max-w-2xl">{children}</main>
  </div>
);

export default Layout;
