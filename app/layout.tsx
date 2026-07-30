import type { Metadata } from "next";
import { Playfair_Display, Lora, Courier_Prime } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const lora = Lora({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-lora",
  display: "swap",
});

const courierPrime = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-courier",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Desbordar Afetos · Ateliê-clínico",
  description:
    "Onde a psicologia e a arte se entrelaçam para acolher, refletir e transformar. Atelier clínico de Ana Clara Reis.",
  openGraph: {
    title: "Desbordar Afetos · Ateliê-clínico",
    description:
      "Onde a psicologia e a arte se entrelaçam para acolher, refletir e transformar.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${lora.variable} ${courierPrime.variable}`}
    >
      <body className="font-body">{children}</body>
    </html>
  );
}
