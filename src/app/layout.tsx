import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css"; 
import { MessageCircle } from "lucide-react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SEINVISAC | Equipos de Protección Personal",
  description: "Empresa especializada en equipos de protección personal y fabricación de botines de seguridad industrial con más de 10 años de experiencia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="es" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        {children}


        <a
          href="https://wa.me/51924338443?text=Hola%20SEINVISAC,%20deseo%20informaci%C3%B3n%20sobre%20sus%20productos."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-[9999] bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:-translate-y-1"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle size={28} />
        </a>
      </body>
    </html>
  );
}