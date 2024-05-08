import type { Metadata } from "next";
import { Urbanist } from 'next/font/google'
import "./globals.css";

const font = Urbanist({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "PaperPlane",
  description: "super message zero",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="">{children}</body>
    </html>
  );
}
