import type { Metadata } from "next";
import { Kanit, Spline_Sans } from "next/font/google";
import "./globals.css";

const kanit = Kanit({
  variable: "--font-kanit",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

const spline = Spline_Sans({
  variable: "--font-spline",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://nexocinco.co"),
  title: "Nexo Cinco | Coaching independiente de Mobile Legends",
  description:
    "Coaching de Mobile Legends para entender línea, rotaciones, objetivos y juego de equipo. Pago único y coordinación directa por correo.",
  alternates: { canonical: "/" },
  openGraph: {
    locale: "es_CO",
    type: "website",
    title: "Nexo Cinco | Cinco roles. Una sola lectura.",
    description:
      "Entrenamiento independiente para tomar mejores decisiones en Mobile Legends.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Nexo Cinco, tablero táctico de cinco roles" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexo Cinco | Cinco roles. Una sola lectura.",
    description: "Coaching independiente para leer mejor cada partida.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es-CO">
      <body className={`${kanit.variable} ${spline.variable}`}>{children}</body>
    </html>
  );
}
