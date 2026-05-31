import type { Metadata } from "next";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { sanityClient } from "@/lib/sanity/client";
import { allCategoriesQuery } from "@/lib/sanity/queries";
import type { Category } from "@/lib/types/product";

export const metadata: Metadata = {
  title: "MyShop — сучасна вітрина одягу",
  description:
    "Онлайн-вітрина одягу з каталогом товарів, пошуком, обраним і сторінками категорій.",
};

export const revalidate = 60;

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const categories = await sanityClient.fetch<Category[]>(allCategoriesQuery);

  return (
    <html lang="uk">
      <body className="min-h-screen bg-neutral-50 text-neutral-950 antialiased">
        <Header categories={categories || []} />
        {children}
        <Footer />
      </body>
    </html>
  );
}