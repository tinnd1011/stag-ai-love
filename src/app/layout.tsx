import type { Metadata } from "next";
import localFont from "next/font/local";
import Head from "next/head";
const neueHass = localFont({
  src: "../../public/fonts/NeueHaasDisplayMediu.woff2",
  variable: "--font-neueHass",
  display: "swap",
});

const marbold = localFont({
  src: "../../public/fonts/MarboldNormal-Kd2Z.woff2",
  variable: "--font-marbold",
  display: "swap",
});

const inter = localFont({
  src: "../../public/fonts/Inter.ttf",
  variable: "--font-inter",
  display: "swap",
});

import "./globals.css";
import { Suspense } from "react";
import ContextProvider from "@/context";
import { headers } from "next/headers";

export const metadata: Metadata = {
  // metadataBase: new URL("https://dashboard.cellprotocol.science/"),
  title: "No Code. No Boundaries.Infinite Creativity.",
  description:
    "Turn your AI dreams into reality with Xetra AI - no coding, no limits, just unstoppable innovation on a censorship-resistant blockchain.",
  openGraph: {
    title: "No Code. No Boundaries.Infinite Creativity.",
    description:
      "Turn your AI dreams into reality with Xetra AI - no coding, no limits, just unstoppable innovation on a censorship-resistant blockchain.",
    // url: new URL("https://dashboard.cellprotocol.science/")
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersObj = headers();
  const cookies = headersObj.get("cookie");

  return (
    <html lang="en">
      <Head>
        <title>No Code. No Boundaries.Infinite Creativity.</title>
        <meta
          name="description"
          content="Turn your AI dreams into reality with Xetra AI - no coding, no limits, just unstoppable innovation on a censorship-resistant blockchain."
        />
        <meta property="og:image" content="./opengraph-image.jpg"></meta>
        {/* <meta property="og:url" content="https://dashboard.cellprotocol.science"></meta> */}
        <meta
          property="og:title"
          content="No Code. No Boundaries.Infinite Creativity."
        ></meta>
        {/* <meta property="og:site_name" content="https://dashboard.cellprotocol.science"></meta> */}
        <meta
          property="og:description"
          content="Turn your AI dreams into reality with Xetra AI - no coding, no limits, just unstoppable innovation on a censorship-resistant blockchain."
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.ico"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${marbold.variable} ${neueHass.variable} ${inter.className}`}
      >
        <ContextProvider cookies={cookies}>
          <Suspense>{children}</Suspense>
        </ContextProvider>
      </body>
    </html>
  );
}
