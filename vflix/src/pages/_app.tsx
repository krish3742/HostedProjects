import type { AppProps } from "next/app";

import Providers from "@/store/StoreProvider";
import Navbar from "@/components/Navbar";

import "@/components/Navbar.module.css";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Providers>
      <Navbar />
      <Component {...pageProps} />
    </Providers>
  );
}
