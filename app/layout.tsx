import type { Metadata } from "next";
import { Outfit, Nunito, Fraunces, Lora } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

// One pairing per world, swapped by CSS variables (see globals.css):
//   ocean : Outfit (round, fluid headings) + Nunito (soft, rounded text)
//   forest: Fraunces (organic, soft-serif headings) + Lora (warm book text)
// The forest pair is not preloaded: it is only fetched if that theme is used.
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const nunito = Nunito({ subsets: ["latin"], variable: "--font-nunito", display: "swap" });
const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap", preload: false });
const lora = Lora({ subsets: ["latin"], variable: "--font-lora", display: "swap", preload: false });

export const metadata: Metadata = {
  title: "Dhruv Negi — Software Developer Engineer",
  description:
    "Software Developer Engineer at GoSamplify, based in Gurugram, India. REST APIs, real-time services and backend architecture in Node.js, TypeScript and Python.",
  openGraph: {
    title: "Dhruv Negi — Software Developer Engineer",
    description:
      "Software Developer Engineer at GoSamplify, based in Gurugram, India. REST APIs, real-time services and backend architecture in Node.js, TypeScript and Python.",
    type: "website",
  },
};

export const viewport = {
  themeColor: "#05070F",
  colorScheme: "dark light",
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <noscript>
          <style>{`#boot{display:none!important}`}</style>
        </noscript>
        <link rel="icon" href="/opt/logo.png" sizes="64x64" />
      </head>
      <body
        className={`${outfit.variable} ${nunito.variable} ${fraunces.variable} ${lora.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          themes={["dark", "light"]}
          enableSystem={false}
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
