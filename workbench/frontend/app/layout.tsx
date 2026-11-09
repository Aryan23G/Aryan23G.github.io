import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "QueryPilot Workbench",
  description: "Deterministic Text-to-SQL analytics workbench: schema RAG, SQLGlot-validated SQL, read-only execution, full trace.",
};

export const viewport: Viewport = { themeColor: "#0f0f12" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body>{children}</body>
    </html>
  );
}
