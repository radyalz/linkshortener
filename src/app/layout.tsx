import type { Metadata } from "next";
import { cookies } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";

import { ThemeProvider } from "@/components/providers/themeProvider";
import { AppBackground } from "@/components/ui/appBackground";
import { Toaster } from "@/components/ui/sonner";
import type { AppTheme } from "@/lib/actions/theme";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Short Link Manager",
  description: "Create, manage, and track short links.",
};

function getTheme(value: string | undefined): AppTheme {
  return value === "light" || value === "dark" ? value : "dark";
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const theme = getTheme(cookieStore.get("theme")?.value);

  return (
    <html lang="en" className={theme} suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider forcedTheme={theme}>
          <AppBackground />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
