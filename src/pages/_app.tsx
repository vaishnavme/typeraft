import { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { NextPage } from "next";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { Geist, Geist_Mono, IBM_Plex_Serif } from "next/font/google";
import "@/styles/globals.css";
import Layout from "@/components/layout/layout";
import { Toaster } from "@/components/ui/sonner";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const ibmPlext = IBM_Plex_Serif({
  variable: "--font-ibm-plex-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => <Layout>{page}</Layout>);

  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      disableTransitionOnChange
    >
      <div
        className={`${geistSans.variable} ${geistMono.variable} ${ibmPlext.variable}`}
      >
        {getLayout(<Component {...pageProps} />)}
      </div>
      <Toaster />
    </NextThemesProvider>
  );
}

export default App;
