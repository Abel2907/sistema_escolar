import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "../globals/globals.css";

type RootLayoutProps = {
  children: ReactNode;
};

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        {children}
      </body>
    </html>
  );
}