import type { Metadata } from "next";
import { Orbitron, Press_Start_2P } from "next/font/google";
import "./globals.css";

const pressStart = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start",
});

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

export const metadata: Metadata = {
  title: "The Indy 500 | Beer Pong Scoreboard",
  description:
    "Live beer pong scoreboard — race to exactly 251 points. The Indy 500 championship.",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${pressStart.variable} ${orbitron.variable} h-full`}
    >
      <body className="min-h-full bg-[#07020f] font-score text-white antialiased">
        {children}
      </body>
    </html>
  );
}
