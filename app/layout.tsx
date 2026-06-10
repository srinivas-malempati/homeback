import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HomeBack — NRI US Exit Advisor",
  description: "The smartest way for Indian families to move back home from the USA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{children}</body>
    </html>
  );
}
