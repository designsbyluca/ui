import type { Metadata } from "next";
import { Inter_Tight, JetBrains_Mono, Newsreader } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({ variable: "--font-inter-tight", subsets: ["latin"] });
const newsreader = Newsreader({ variable: "--font-newsreader", subsets: ["latin"] });
const jetbrainsMono = JetBrains_Mono({ variable: "--font-jetbrains-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "designsbyluca/ui",
  description: "Free, square, calm components for shadcn/ui. MIT licensed.",
};

// Sets the theme before the first paint, so a stored dark choice does not flash light.
const themeScript = `try{var t=localStorage.getItem("theme");if(t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches))document.documentElement.classList.add("dark")}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${interTight.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
