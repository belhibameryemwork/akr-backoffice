import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AKR Smart Consulting - Back-Office",
  description: "Manage appointments and users efficiently.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
