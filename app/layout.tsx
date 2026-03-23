import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

export const metadata: Metadata = {
  title: "Victor Eduardo — Full Stack Developer & Data Engineer",
  description:
    "Desenvolvedor Full Stack com background em engenharia industrial e análise de dados. Transformando dados operacionais em soluções inteligentes.",
  keywords: ["developer", "portfolio", "data analysis", "full stack", "react", "sql", "power bi"],
  authors: [{ name: "Dev Portfolio" }],
  openGraph: {
    title: "Victor Eduardo — Full Stack Developer & Data Engineer",
    description: "Turning operational data into intelligent solutions",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#050a0f] dark:bg-[#050a0f] light:bg-slate-50 antialiased">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
