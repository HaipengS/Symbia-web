import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { WaitlistProvider } from "@/lib/waitlist-context";
import WaitlistModal from "@/components/WaitlistModal";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Roxborough CF ships Regular only — headings render at 400, no synthetic bold.
const roxborough = localFont({
  src: "./fonts/roxborough-cf-regular.otf",
  variable: "--font-roxborough",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Symbia",
  description: "Growing a future of functional sustainability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${roxborough.variable} antialiased`}>
        <WaitlistProvider>
          {children}
          <WaitlistModal />
        </WaitlistProvider>
      </body>
    </html>
  );
}
