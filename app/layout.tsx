import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers/Providers"; // або шлях до твого файлу провайдерів
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes application",
};

interface RootLayoutProps {
  children: React.ReactNode;
  modal: React.ReactNode;
}

export default function RootLayout({ children, modal }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />
          <main>{children}</main>
          <Footer />
          {modal}
        </Providers>
      </body>
    </html>
  );
}
