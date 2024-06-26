
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import ReactQueryProvider from "@/providers/ReactQueryProvider";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ReactQueryProvider>
        <body className={cn(inter.className, "box-border bg-yellow-100")}>{children}</body>
      </ReactQueryProvider>
    </html>
  );
}
