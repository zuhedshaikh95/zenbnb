import getUser from "@/actions/getUser";
import { LoginModal, Navbar, RegisterModal, RentModal, SearchModal } from "@/components";
import ToasterProvider from "@/providers/ToasterProvider";
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Zenbnb | Holiday rentals, cabins, beach houses &amp; more",
  description: "Zenbnb | Holiday rentals, cabins, beach houses &amp; more",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
        <Suspense>
          <Navbar user={user} />
          <SearchModal />
        </Suspense>
        <ToasterProvider />
        <RegisterModal />
        <LoginModal />
        <RentModal />
        <div className="pb-20 pt-28">{children}</div>
      </body>
    </html>
  );
}
