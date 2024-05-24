import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "./fonts";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "LAWSAN Tickets",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} max-w-[100rem] mx-auto`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
