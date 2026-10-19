import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Control de ventas",
  description: "Registra tus ventas diarias y consulta estadísticas.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
