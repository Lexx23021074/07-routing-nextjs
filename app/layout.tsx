import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/Providers/Providers"; // або шлях до твого файлу провайдерів

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
          {children}
          {modal}
        </Providers>
      </body>
    </html>
  );
}
