import { LoginModal, Navbar, RegisterModal } from "@/components";
import ToasterProvider from "@/providers/ToasterProvider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenbnb | Holiday rentals, cabins, beach houses &amp; more",
  description: "Zenbnb | Holiday rentals, cabins, beach houses &amp; more",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Navbar />
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        {children}
      </body>
    </html>
  );
}
