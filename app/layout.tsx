import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

// One pairing for both themes (see globals.css): Bodoni Moda, the high-contrast
// engraver's serif of printed scores, for titles; Inter for everything else.
const bodoni = Bodoni_Moda({ subsets: ["latin"], variable: "--font-bodoni", display: "swap" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

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
  themeColor: "#000000",
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
        className={`${bodoni.variable} ${inter.variable} font-sans antialiased`}
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
