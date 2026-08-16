import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kaalyug — Open Source Marketplace",
  description: "Kaalyug is an open-source digital ecosystem.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.className} antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
