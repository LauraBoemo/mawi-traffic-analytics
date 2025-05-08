import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import styles from "./page.module.css";
import "./globals.css";

import Sidebar from "./components/Sidebar";
import { MainValuesProvider } from "./contexts/MainValuesContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mawi Traffic Analytics",
  description: "Made by Davi, Giovana, João & Laura",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} ${styles.body}`} style={{ display: 'flex' }}>
        <Sidebar />
        <MainValuesProvider>
          <main className={styles.page} style={{ flexGrow: 1, padding: '2rem', marginLeft: "240px" }}>
            {children}
          </main>
        </MainValuesProvider>
      </body>
    </html>
  );
}
