import { Space_Grotesk, Inter } from "next/font/google";

// Both are variable fonts, so no `weight` is specified (next/font/google
// requires it only for non-variable fonts). Loaded once here and imported
// wherever needed, per the next/font guidance against re-instantiating the
// same font in multiple files.
export const display = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

export const body = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});
