import { JetBrains_Mono, Space_Grotesk } from "next/font/google";

// Shared by the root layouts of the site and of the admin
export const grotesk = Space_Grotesk({
  variable: "--font-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const mono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const fontClasses = `${grotesk.variable} ${mono.variable} antialiased`;
