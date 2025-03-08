import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { Toaster } from "@/components/ui/sonner";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <div>{getLayout(<Component {...pageProps} />)}</div>
      <Toaster />
    </NextThemesProvider>
  );
}
