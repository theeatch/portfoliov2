import type { Metadata } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";

import "./globals.css";
import { ThemeProvider } from "./provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

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
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/logopic.png" sizes="any" />
      </head>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} ${inter.className} scroll-smooth antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
