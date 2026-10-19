import type { Metadata } from "next";
import localFont from "next/font/local";

import "./globals.css";
import { ThemeProvider } from "./provider";

// One set for both themes (see globals.css), all of it libre type from the Velvetyne
// foundry and all of it serif. Daubenton, capitals revived from the engraved
// letters on a Paris museum façade, for titles and plates; Bluu Next's angular bold
// italic for the accent phrase in a title; Happy Times for everything you read.
// Served from app/fonts (licences alongside); nothing comes from a CDN.
// (next/font reads these options at build time, so they have to be literals)
const daubenton = localFont({
  src: "./fonts/Daubenton-Regular.woff",
  variable: "--font-daubenton",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});
const bluu = localFont({
  src: [{ path: "./fonts/BluuNext-BoldItalic.woff2", weight: "700", style: "italic" }],
  variable: "--font-bluu",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});
const happy = localFont({
  src: [
    { path: "./fonts/HappyTimes-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/HappyTimes-Italic.woff2", weight: "400", style: "italic" },
    { path: "./fonts/HappyTimes-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-happy",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
  adjustFontFallback: "Times New Roman",
});

export const metadata: Metadata = {
  title: "Dhruv Negi - Software Developer Engineer",
  description:
    "Software Developer Engineer at GoSamplify, based in Gurugram, India. REST APIs, real-time services and backend architecture in Node.js, TypeScript and Python.",
  openGraph: {
    title: "Dhruv Negi - Software Developer Engineer",
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
        className={`${daubenton.variable} ${bluu.variable} ${happy.variable} font-sans antialiased`}
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
