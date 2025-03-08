import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <div>
    <main className="mx-auto max-w-2xl p-4 sm:p-6">{children}</main>
  </div>
);

export default Layout;
