import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://mnanimat.xyz"),
  title: {
    default: "MN Animat | Tecnologia, Engenharia e Personalização",
    template: "%s | MN Animat"
  },
  description:
    "Loja premium para Fórmula, kart cross, mobilidade elétrica, aeronaves, robótica autônoma, produtos aeroespaciais e vestuário personalizado.",
  openGraph: {
    title: "MN Animat",
    description: "Tecnologia, engenharia e produtos personalizados em uma experiência premium.",
    type: "website",
    locale: "pt_BR",
    url: "https://mnanimat.xyz",
    siteName: "MN Animat"
  },
  icons: {
    icon: "/images/brand/favicon.svg"
  }
};

export const viewport: Viewport = {
  themeColor: "#07080b",
  colorScheme: "dark"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
