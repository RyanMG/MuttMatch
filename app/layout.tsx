import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import AuthProvider from "@context/authProvider";
import Header from "@ui/header/Header";
import Sidebar from "@ui/sidebar/SidebarLayout";
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
  title: "Mutt Match",
  description: "Find your next favorite pup!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white h-screen w-full overflow-hidden`}
      >
        <AuthProvider>
          <div className="flex flex-col h-screen">
            <Header />

            <div className="flex-1 w-screen flex flex-col md:flex-row overflow-hidden">
              <Sidebar />
              {children}
            </div>

          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
